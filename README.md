# Austin Coming Together Individual Donor System Design Hub

This is the GitHub-ready simple version of the webpage.

## Files

- `index.html` — the full webpage
- `.nojekyll` — helps GitHub Pages serve the site without Jekyll processing
- `README.md` — basic instructions

## How to use with GitHub

1. Create a new GitHub repository.
2. Upload `index.html`, `.nojekyll`, and `README.md` directly into the root of the repository.
3. Do not upload the ZIP file itself.
4. Go to **Settings** → **Pages**.
5. Under **Build and deployment**, choose:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/root**
6. Save.

Your GitHub Pages site will usually appear at:

```text
https://YOUR-USERNAME.github.io/YOUR-REPOSITORY-NAME/
```

## How to use with Netlify

You can also drag `index.html` directly into Netlify using manual deploy.

## How to edit

Open `index.html` in a code editor.

Search for:

```js
const fieldData = [
```

That section contains the searchable field database.
