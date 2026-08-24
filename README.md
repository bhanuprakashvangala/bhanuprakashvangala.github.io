# bhanuprakashvangala.github.io

Personal academic site for **Bhanu Prakash Vangala**, doctoral researcher in
agentic AI and LLM systems at the University of Missouri.
Built with Jekyll, deployed by GitHub Pages.

## The one thing to know

**`_data/cv.yml` is the single source of truth.** The homepage, the CV page and
the AI assistant's knowledge base are all generated from it. To update the site
(a new paper, a new role, a new award), edit that file and push. Nothing else
needs touching.

```
_data/cv.yml
   |
   +-- _pages/about.md          homepage (hero, news, publications, research, ...)
   +-- _pages/cv.md             /cv/  full CV, print-optimised
   +-- assets/data/kb.json      knowledge base the assistant retrieves from
```

## Layout

| Path | Purpose |
|---|---|
| `_data/cv.yml` | All content: profile, education, experience, publications, research programs, projects, awards, service, teaching, talks, coursework, skills, news |
| `_pages/about.md` | Homepage |
| `_pages/cv.md` | `/cv/`, full CV; the print button yields a clean one-column PDF |
| `_pages/demos.md` | `/demos/`, three runnable demonstrations of published work |
| `assets/data/kb.json` | Generated at build time; never edit by hand |
| `assets/js/site.js` | Theme toggle, scroll-spy, publication filter, news collapse, lightbox |
| `assets/js/assistant.js` | The research assistant: BM25 retrieval, offline answers, optional live model |
| `assets/js/demos.js` | Reproducibility checker, Pick-and-Spin router, agent loop |
| `_sass/_tokens.scss` | Colour, type, space and motion tokens for light and dark |
| `_sass/_theme.scss` | Base typography, page shell, masthead, sidebar, hero |
| `_sass/_components.scss` | Publications, timeline, news, awards, projects, CV |
| `_sass/_assistant.scss` | The assistant widget |
| `_sass/_demos.scss` | The demos page |
| `assistant-api/` | Serverless proxy holding the model API key. Deployed separately; excluded from the Jekyll build |

## The assistant

Visitors can ask questions about the research and get answers with citations
back to the relevant page section.

It runs in **offline mode by default**: it retrieves passages from
`assets/data/kb.json` using BM25, extracts the sentences that match the
question, and cites what it used. No backend, no API key, no cost, and it cannot
invent a paper that is not in the CV.

Setting `assistant.endpoint` in `_config.yml` upgrades it to **live mode**: the
same retrieval runs, then the passages are sent as grounding context to a
self-hosted model through a proxy. If that call fails for any reason, the
offline answer is served instead, so the visitor never sees a dead end.

> **The API key must never enter this repository.** GitHub Pages serves
> everything publicly, so a key in the JavaScript or in `_config.yml` is a key
> anyone can read and spend. It lives only as a server-side environment
> variable on the proxy. See [`assistant-api/README.md`](assistant-api/README.md).

## Live demos

`/demos/` runs real implementations of the published methods, entirely in the
browser:

1. **Dependency & reproducibility checker**. Paste Python and an environment
   file; it resolves imports to distributions and reports hidden, bloat,
   unpinned and unverified dependencies. From *AI-Generated Code Is Not
   Reproducible (Yet)* (AAAI 2026 RAI Workshop) and *Code That Works, Environments
   That Don't*.
2. **Pick-and-Spin router**. Thompson Sampling over a model pool with a
   cold-start state machine governing GPU residency; utilisation and cold-start
   rate update as you send requests. From *Efficient Multi-Model Orchestration*
   (AAAI 2026 DAI Workshop) and *Pick-and-Spin* (IEEE CLOUD 2026).
3. **Reproducibility agent**. A plan / tool-call / result / answer loop that uses
   demo 1 as its tool. Needs a configured endpoint; says so plainly if there
   isn't one.

## Local development

```bash
bundle install
bundle exec jekyll serve   # http://localhost:4000
```

Ruby 3.2+ removed `Object#tainted?`, which the pinned Liquid still calls. If a
local build fails with `undefined method 'tainted?'`, use Ruby 3.1 or add a shim
in a local-only script. GitHub Pages builds on a compatible stack.
