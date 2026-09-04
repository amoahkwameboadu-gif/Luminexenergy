# Luminex Energy Solutions — site files

This is a static website: HTML, CSS, and JavaScript only. There is no
Python (or any other backend language) in this project, so nothing
else needs separating out — a static site like this doesn't need a
server to run.

## File structure

```
luminex-site/
├── index.html          # the page structure/content
├── css/
│   └── styles.css      # your custom CSS rules
└── js/
    ├── tailwind-config.js  # Tailwind's color/font settings
    └── script.js            # page behavior (menu, form, animations)
```

`index.html` still loads Tailwind itself from a CDN link (that's a
third-party library, not something to split out) — only the CSS and
JS you actually wrote were pulled into their own files.

## Deploy to GitHub Pages

1. Create a new repository on GitHub (e.g. `luminex-site`).
2. Upload these four files/folders to it, keeping the same structure
   (`index.html` at the root, `css/` and `js/` as subfolders).
3. On GitHub, go to **Settings → Pages**.
4. Under "Source", choose **Deploy from a branch**, pick `main` and
   `/ (root)`, then **Save**.
5. GitHub gives you a live URL after a minute or two, usually
   `https://<your-username>.github.io/luminex-site/`.
