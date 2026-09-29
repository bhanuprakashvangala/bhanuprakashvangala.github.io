# Bhanu Prakash Vangala — academic portfolio

A simple, responsive Jekyll website hosted on GitHub Pages. The main pages use plain HTML and CSS: no JavaScript, web fonts, framework, or build-time Node dependencies are needed for the portfolio.

## Updating content

- `_data/cv.yml`: profile, publications, experience, education, projects, news, teaching, and awards.
- `_pages/about.md`: short introduction and homepage sections.
- `files/Bhanu_Prakash_Academic_CV.pdf`: downloadable academic CV. Replace it when the PDF changes and update `cv_date` in the data file.
- `assets/css/portfolio.css`: responsive styling and print layout.
- `_layouts/default.html`: navigation, metadata, and footer.

Publication `status` is `accepted`, `review`, `preparation`, or `poster`. The publications and web CV pages group these separately. The homepage shows all accepted and under-review papers, plus a separate in-preparation section. Each publication has `image` and `image_alt` fields; `related_work` preserves an earlier workshop version without counting it as a separate main paper. Set `homepage: true` on projects to show them on the homepage. Add links only when there is a real public paper or an author-approved local PDF. `equal_contributors` lists the names that receive an asterisk and an equal-contribution note.

Content was reconciled against the September 25, 2026 academic CV. Publication titles and author lists follow the latest academic CV. CAMP's manuscript order and equal first authorship were confirmed by Bhanu. The original downloadable CV is preserved unchanged; the web CV includes the confirmed CAMP co-first-author attribution. Under-review manuscript PDFs are not bundled; their figures are used as publication thumbnails.

Earlier publications and theses were recovered from the previous site and checked against author-uploaded reports. AdaptFlow is in preparation for MLSys 2027, as corrected by Bhanu. The seven recent accepted papers remain separate from earlier publications, seven submitted manuscripts, and the poster.

Every project has an image and an accessible GitHub icon. `github` points to an existing public repository, a new companion example, or its documented page in [portfolio-artifacts](https://github.com/bhanuprakashvangala/portfolio-artifacts). Original public code is reused when available. The example repositories clearly distinguish new reference implementations from historical research code. Keep repository links public and project-specific.

Publication figures remain on the left; project photographs and original research outputs appear on the right. Topic photographs are identified in their alt text and on `/image-credits/`. Click any thumbnail to see the full-size image. GitHub links display only the symbol and have project-specific accessibility labels. Editable SVG diagrams remain available for repository documentation and can be regenerated with `python scripts/draw_project_figures.py`; they are not used as the website's project thumbnails.

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
| `/` | Introduction, updates, all seven accepted papers, submissions, illustrated earlier work, experience, and teaching |
| `/publications/` | Published/accepted work, under-review papers, and posters |
| `/cv/` | Full web CV and original PDF download |
| `/projects/` | Selected projects |
| `/news/` | Updates archive |
| `/demos/` | Existing research demonstrations, retained with the legacy layout |

The former theme and demo implementation remain available under `_layouts/legacy.html`, `_sass/`, and the original JavaScript files. They are not loaded by the main portfolio. The assistant is disabled in `_config.yml`; the separately deployed `assistant-api/` backend is untouched.
