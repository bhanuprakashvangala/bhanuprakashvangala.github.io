# Bhanu Prakash Vangala — academic portfolio

A simple, responsive Jekyll website hosted on GitHub Pages. The main pages use plain HTML and CSS: no JavaScript, web fonts, framework, or build-time Node dependencies are needed for the portfolio.

## Updating content

- `_data/cv.yml`: profile, publications, experience, education, projects, news, teaching, and awards.
- `_pages/about.md`: short introduction and homepage sections.
- `files/Bhanu_Prakash_Academic_CV.pdf`: downloadable academic CV. Replace it when the PDF changes and update `cv_date` in the data file.
- `assets/css/portfolio.css`: responsive styling and print layout.
- `_layouts/default.html`: navigation, metadata, and footer.

Publication `status` is `accepted`, `review`, or `poster`. The publications and web CV pages group these separately. Set `featured: true` for homepage selections. Add links only when there is a real public paper or an author-approved local PDF. `equal_contributors` lists the names that receive an asterisk and an equal-contribution note.

Content was reconciled against the September 25, 2026 academic CV. Published papers take precedence for their title and author order. CAMP's manuscript order and equal first authorship were confirmed by Bhanu. The original downloadable CV is preserved unchanged; the web CV includes these metadata corrections. Under-review manuscript PDFs are not bundled.

## Local development

For the pinned GitHub Pages dependencies, use Ruby 3.1:

```sh
bundle install
bundle exec jekyll serve
```

Open http://localhost:4000. To verify the generated pages:

```sh
bundle exec jekyll build
python scripts/check_site.py
```

`scripts/check_site.py` checks local links, anchors, image descriptions, and page headings. A ready-to-use GitHub Pages CI workflow is included at `docs/check-site-workflow.yml`; move it to `.github/workflows/` using a GitHub login with workflow permission to enable automatic PR checks. Publishing still uses the repository's existing GitHub Pages deployment from `main`.

## Routes

| Route | Content |
| --- | --- |
| `/` | Introduction, updates, selected papers, experience, and teaching |
| `/publications/` | Published/accepted work, under-review papers, and posters |
| `/cv/` | Full web CV and original PDF download |
| `/projects/` | Selected projects |
| `/news/` | Updates archive |
| `/demos/` | Existing research demonstrations, retained with the legacy layout |

The former theme and demo implementation remain available under `_layouts/legacy.html`, `_sass/`, and the original JavaScript files. They are not loaded by the main portfolio. The assistant is disabled in `_config.yml`; the separately deployed `assistant-api/` backend is untouched.
