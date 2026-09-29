"""Check generated portfolio pages and their local links. No third-party dependencies."""
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
import sys
from urllib.parse import unquote, urlsplit


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.ids, self.links, self.errors = [], [], []
        self.headings = 0
        self.feed(path.read_text(encoding="utf-8"))

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            self.ids.append(attrs["id"])
        if tag == "h1":
            self.headings += 1
        if tag == "img" and not attrs.get("alt"):
            self.errors.append("Image is missing descriptive alt text")
        for attr in ("href", "src"):
            if attrs.get(attr):
                self.links.append(attrs[attr])


def check(root):
    routes = ["index.html", "publications/index.html", "cv/index.html",
              "projects/index.html", "news/index.html", "image-credits/index.html"]
    errors = []
    for route in routes:
        path = root / route
        if not path.is_file():
            errors.append(f"Missing page: {route}")
            continue
        page = Page(path)
        errors.extend(f"{route}: {error}" for error in page.errors)
        if page.headings != 1:
            errors.append(f"{route}: expected one h1, found {page.headings}")
        duplicates = [id for id, count in Counter(page.ids).items() if count > 1]
        if duplicates:
            errors.append(f"{route}: duplicate IDs {duplicates}")
        for link in page.links:
            url = urlsplit(link)
            if url.scheme or url.netloc:
                continue
            if not url.path:
                target = path
            elif url.path.startswith("/"):
                target = root / unquote(url.path.lstrip("/"))
            else:
                target = path.parent / unquote(url.path)
            if target.is_dir():
                target /= "index.html"
            if not target.is_file():
                errors.append(f"{route}: missing target {link}")
            elif url.fragment and target.suffix == ".html":
                if unquote(url.fragment) not in Page(target).ids:
                    errors.append(f"{route}: missing anchor {link}")
    if errors:
        raise SystemExit("\n".join(errors))
    print(f"PASS: {len(routes)} portfolio pages; local links, anchors, headings, and image descriptions.")


if __name__ == "__main__":
    check(Path(sys.argv[1] if len(sys.argv) > 1 else "_site"))
