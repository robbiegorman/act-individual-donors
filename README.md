# Individual Donor System Design Hub

A GitHub-ready Vite + React + Tailwind website for an internal Salesforce individual donor system planning resource.

This version is designed for GitHub + Netlify deployment and should preserve the styling better than the earlier direct static upload.

## What's included

```text
individual-donor-system-github/
├── index.html
├── netlify.toml
├── package.json
├── postcss.config.js
├── public/
│   └── _redirects
├── src/
│   ├── App.jsx
│   ├── data.js
│   ├── data.test.js
│   ├── index.css
│   └── main.jsx
├── tailwind.config.js
└── vite.config.js
```

## Run locally

1. Install Node.js if you do not already have it.
2. In Terminal, open this folder.
3. Run:

```bash
npm install
npm run dev
```

Vite will give you a local preview URL, usually:

```bash
http://localhost:5173/
```

## Run tests

```bash
npm test
```

The tests validate that the donor field database has the required fields, approved QuickBooks mapping values, approved phases, and core categories.

## Build for production

```bash
npm run build
```

This creates a `dist` folder.

## Deploy to Netlify through GitHub

1. Create a new GitHub repository.
2. Upload all files in this folder to the repository.
3. In Netlify, choose **Add new site** → **Import an existing project**.
4. Connect your GitHub repository.
5. Netlify should read `netlify.toml` automatically:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Deploy.

## Edit the field database

Most content for the searchable field table lives in:

```text
src/data.js
```

Edit `fieldData` to add, remove, or revise fields.

## Styling notes

The site uses Tailwind CSS. The styling is generated during the Netlify build step, which is why this GitHub/Vite version should look more polished and consistent than a direct static upload.

## No external icon dependency

The icons are inline SVG paths in `src/App.jsx`. This avoids CDN or package-fetch errors from icon libraries.
