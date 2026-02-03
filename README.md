# IoT Portfolio Web App (Static)

This is a static portfolio web app that reads content from `data/profile.json`. It is ready for GitHub Pages.

## Deploy to GitHub Pages

1. Push this folder to a GitHub repo.
2. In GitHub, go to Settings > Pages.
3. Set the source to `main` branch and `/root` folder.
4. Save and open the provided URL.

## Update content

Edit `data/profile.json`, then run:

`python cgpt\sweb\scripts\embed_profile.py`

## Notes

- Your CV is served from `static/files/`.
