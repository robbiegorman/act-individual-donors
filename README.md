# Austin Coming Together Salesforce Updates Site

This is a GitHub-ready simple webpage for ACT's Marketing + Development Salesforce Updates.

## Files

- `index.html` — the full webpage
- `.nojekyll` — helps GitHub Pages serve the site without Jekyll processing
- `source-materials/` — contains the source spreadsheet and Word document used to revise the page
- `README.md` — basic instructions

## How to use with GitHub Pages

1. Create a new GitHub repository.
2. Upload `index.html`, `.nojekyll`, `README.md`, and the full `source-materials` folder directly into the root of the repository.
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

You can also drag the unzipped folder directly into Netlify using manual deploy.

## How to edit the field database

Open `index.html` in a code editor.

Search for:

```js
const fieldData = [
```

That section contains the searchable field database generated from the uploaded spreadsheet.
