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

```bash
cd assistant-api
npx vercel login
npx vercel link                    # create a new project

npx vercel env add NRP_API_KEY production      # paste your NRP token
npx vercel env add ALLOWED_ORIGINS production  # https://bhanuprakashvangala.github.io

npx vercel deploy --prod
```

Vercel prints a URL. Your endpoint is that URL plus `/api/chat`.

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

The NRP catalogue rotates. Current entries include `gpt-oss` (a good
general-purpose default), `qwen3` (strongest reasoning and longest context),
`kimi`, `glm-5` and `minimax-m2` (agentic coding), `gemma4-12b` and
`qwen3-small` (fast and cheap). Check the live list with:

```bash
curl -H "Authorization: Bearer $NRP_API_KEY" https://ellm.nrp-nautilus.io/v1/models
```

## Rotating the key

If a token is ever exposed, regenerate it at
<https://nrp.ai/documentation/userdocs/ai/llm-managed/api-access>, then update
the environment variable and redeploy. Nothing in the website repository needs
to change, because the key was never there.
