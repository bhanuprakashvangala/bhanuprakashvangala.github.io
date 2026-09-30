"""Fetch citation counts from a public Google Scholar profile into _data/scholar.json.

Uses only the standard library. Run from the repository root:
    python google_scholar_crawler/main.py
The Scholar ID comes from GOOGLE_SCHOLAR_ID, defaulting to the site owner's profile.
"""
import html
import json
import os
import re
import sys
import urllib.request
from datetime import date

SCHOLAR_ID = os.environ.get("GOOGLE_SCHOLAR_ID") or "qHBOnpkAAAAJ"
URL = f"https://scholar.google.com/citations?user={SCHOLAR_ID}&hl=en&cstart=0&pagesize=100"
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "_data", "scholar.json")
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/126.0 Safari/537.36")


def slugify(title):
    """Match Jekyll's default `slugify` filter so the site can join on it."""
    return re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")


def main():
    req = urllib.request.Request(URL, headers={"User-Agent": UA, "Accept-Language": "en-US,en;q=0.9"})
    try:
        page = urllib.request.urlopen(req, timeout=30).read().decode("utf-8", "replace")
    except OSError as err:  # includes HTTPError; Scholar often blocks cloud IPs
        print(f"Could not reach Google Scholar ({err}); keeping existing data.")
        return 0
    if "gsc_a_tr" not in page:
        print("Scholar did not return the profile (probably rate limited); keeping existing data.")
        return 0
    stats = [int(x) for x in re.findall(r'class="gsc_rsb_std">(\d+)<', page)]
    pubs = []
    for title, cites in re.findall(r'class="gsc_a_at">(.*?)</a>.*?class="gsc_a_ac gs_ibl"[^>]*>(\d*)<', page, re.S):
        title = html.unescape(re.sub(r"<[^>]+>", "", title)).strip()
        pubs.append({"title": title, "slug": slugify(title), "citations": int(cites or 0)})
    data = {
        "scholar_id": SCHOLAR_ID,
        "url": f"https://scholar.google.com/citations?user={SCHOLAR_ID}&hl=en",
        "updated": date.today().isoformat(),
        "citations": stats[0] if stats else 0,
        "h_index": stats[2] if len(stats) > 2 else 0,
        "i10_index": stats[4] if len(stats) > 4 else 0,
        "publications": pubs,
    }
    try:
        with open(OUT, encoding="utf-8") as f:
            old = json.load(f)
        if {k: v for k, v in old.items() if k != "updated"} == {k: v for k, v in data.items() if k != "updated"}:
            print("Citation counts unchanged.")
            return 0
    except (OSError, ValueError):
        pass
    with open(OUT, "w", encoding="utf-8", newline="\n") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"Saved {len(pubs)} publications, {data['citations']} citations.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
