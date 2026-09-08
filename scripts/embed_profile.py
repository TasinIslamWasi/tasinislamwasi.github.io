import json
from pathlib import Path


def main() -> None:
    root = Path(__file__).resolve().parent.parent
    data_path = root / "data" / "profile.json"
    html_path = root / "index.html"

    profile = json.loads(data_path.read_text(encoding="utf-8-sig"))
    blob = json.dumps(profile, ensure_ascii=False)

    html = html_path.read_text(encoding="utf-8")
    start_tag = '<script id="profileData" type="application/json">'
    end_tag = "</script>"

    if start_tag in html:
        before, rest = html.split(start_tag, 1)
        _, after = rest.split(end_tag, 1)
        html = before + start_tag + blob + end_tag + after
    else:
        needle = '<script src="static/js/app.js"></script>'
        if needle not in html:
            raise SystemExit("Could not find app.js script tag to insert profile data.")
        html = html.replace(
            needle,
            start_tag + blob + end_tag + "\n  " + needle,
        )

    html_path.write_text(html, encoding="utf-8")


if __name__ == "__main__":
    main()
