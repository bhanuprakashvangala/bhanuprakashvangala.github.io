# Assistant API proxy

The chat assistant on the site works **with no backend at all**. It retrieves
passages from a knowledge base generated at build time from `_data/cv.yml`, ranks
them with BM25, and answers with citations. Zero cost, zero configuration.

Deploy this proxy only when you want **full generated answers** from a language
model instead of retrieved passages.

## Why a proxy is not optional

`bhanuprakashvangala.github.io` is a static site on GitHub Pages. Every byte it
serves is public. If an API key were placed in the page's JavaScript, in
`_config.yml`, or anywhere else in the repository, anyone could read it from
"View Source" and spend your NRP quota. A static site cannot keep a secret.

This function is the only place the key exists, as a server-side environment
variable. The browser talks to the proxy; the proxy talks to the model.

## What it enforces

| Control | Behaviour |
|---|---|
| Origin allowlist | Rejects any origin not in `ALLOWED_ORIGINS`, so the endpoint cannot become someone else's free model gateway |
| Rate limit | 12 requests per minute per IP |
| Model allowlist | A crafted request cannot select a model you did not intend to expose |
| Size caps | 16 messages, 4,000 chars each, 12,000 chars of retrieved context |
| Grounding | A system prompt pins answers to the retrieved CV passages and forbids inventing papers, venues, numbers or collaborators |
| Error opacity | Upstream failures are logged server-side; the client only sees "Model backend error" |

## Deploy on Vercel

**Point the project at this folder, not at the repository root.** This directory
is the whole deployment; the website itself is built and served by GitHub Pages.

If you import the repository root, Vercel detects Jekyll and tries to build the
site, which fails. The failure is not your configuration: Vercel runs Ruby 3.3,
Ruby 3.2 removed `Object#tainted?`, and the pinned `liquid 4.0.3` that comes with
the `github-pages` gem still calls it. The build dies with
`undefined method 'tainted?' for an instance of Hash`. GitHub Pages is unaffected
because it builds on its own pinned stack.

In the Vercel project settings:

| Setting | Value |
|---|---|
| Root Directory | `assistant-api` |
| Framework Preset | **Other** (not Jekyll) |
| Build Command | leave blank, with Override on |
| Output Directory | leave blank, with Override on |
| Install Command | leave blank, with Override on |

Then add two environment variables, for Production and Preview:

| Key | Value |
|---|---|
| `NRP_API_KEY` | your NRP token |
| `ALLOWED_ORIGINS` | `https://bhanuprakashvangala.github.io` |

Redeploy. Your endpoint is the deployment URL plus `/api/chat`, for example
`https://bhanuprakashvangala-github-io.vercel.app/api/chat`.

Note that `assistant-api/` has to exist on the branch Vercel is building. If the
project is set to `main`, merge the branch first, or change the production branch
in Settings, Git.

Or do the same from the CLI:

```bash
cd assistant-api
npx vercel link
npx vercel env add NRP_API_KEY production
npx vercel env add ALLOWED_ORIGINS production
npx vercel deploy --prod
```

## Deploy on Netlify

```bash
cd assistant-api
npx netlify login
npx netlify init

npx netlify env:set NRP_API_KEY "your-token"
npx netlify env:set ALLOWED_ORIGINS "https://bhanuprakashvangala.github.io"

npx netlify deploy --prod
```

Endpoint: the site URL plus `/api/chat` (the redirect in `netlify.toml` maps it
to the function).

Note: Netlify's classic function runtime buffers responses, so that variant
returns one complete JSON reply rather than streaming. The site handles both,
you just do not get the token-by-token effect. Vercel streams.

## Point the site at it

Edit `_config.yml` in the repository root:

```yaml
assistant:
  enabled:  true
  endpoint: "https://your-project.vercel.app/api/chat"
  model:    "gpt-oss"
```

Commit and push; GitHub Pages rebuilds. To try an endpoint without committing,
open the assistant on the site, click the gear, paste the URL and save. It is
kept in your browser's `localStorage` and overrides the config for you only.

## Available models

`gpt-oss` is the default and the right one for this site. NRP lists it as
status `main` and an LTS candidate, so it is pinnable and will not be
withdrawn from under a public page, and its own docs put "general-purpose chat
and assistants" first. Measured against this proxy's settings it answers a
grounded CV question in about four seconds using 113 to 223 completion tokens.

The proxy only accepts models NRP lists as `main`:

| Model | Params | Context | Note |
|---|---|---|---|
| `gpt-oss` | 120B | 131K | Default. Text only. Highest throughput here. |
| `qwen3` | 397B | 1.01M | Frontier reasoning. Slower, heaviest footprint. |
| `qwen3-small` | 27B | 1.01M | Lower latency than `qwen3`. |
| `gemma` | 31B | 262K | Multimodal, compact. |

Everything else in the catalogue (`kimi`, `glm-5`, `minimax-m2`,
`deepseek-v4-flash`, `gemma-small`) is marked `evaluating`, which the NRP docs
say may change or be withdrawn. They are also all coding-focused, which this
page has no use for. `qwen3-embedding` is an embedding model and the docs say
explicitly not to use it for chat.

### Reasoning modes, and why the toggle is per model

Every model here reasons before answering, and that reasoning spends tokens
from the same budget as the reply. Two consequences the proxy already handles:

`qwen3`, `qwen3-small` and `gemma` have reasoning **on by default** and return
`content: null` with `finish_reason: "length"` if it eats the whole budget.
The proxy sends them `chat_template_kwargs: {enable_thinking: false}`.

`gpt-oss` has no such switch, and sending it one **corrupts the reply**: it
answers with a raw `<|start|>` token instead of text. So the toggle is applied
from an explicit per-model set, never as a blanket option. If you add a model,
check its card for `enable_thinking` before adding it to `THINKING_TOGGLE`.

`max_tokens` is 700 for this reason. It is roughly three times the largest
completion observed, which leaves room for the thinking pass. Lowering it is
how you get empty answers: `gpt-oss` returns nothing at all at 150.

Check the live catalogue with:

```bash
curl -H "Authorization: Bearer $NRP_API_KEY" https://ellm.nrp-nautilus.io/v1/models
```

## Rotating the key

If a token is ever exposed, regenerate it at
<https://nrp.ai/documentation/userdocs/ai/llm-managed/api-access>, then update
the environment variable and redeploy. Nothing in the website repository needs
to change, because the key was never there.
