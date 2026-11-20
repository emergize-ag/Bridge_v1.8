# Bridge

## Requirements

- Node.js and npm

## Run locally

From this folder, install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open the local URL printed in the terminal.

## Build and preview

Create the static production site in `dist/`, then preview that build locally:

```bash
npm run build
npm run preview
```

Deploy the contents of `dist/` to a static host. The host should support the included `public/_redirects` rule so direct page URLs load correctly.

## Useful commands

```bash
npm run dev       # Start the development server
npm run build     # Build the static site into dist/
npm run preview   # Preview the production build
npm run lint      # Run ESLint
```

## Push to GitHub

For a new GitHub repository, create an empty repo on GitHub, then run these commands from the project folder. Replace the URL with the new repository's URL:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin main
```
