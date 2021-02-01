# Kite weather
Weather info to find the best time to go kitesurfing

---

## Usage
### Dev
- Install the dev environment using `npm ci`
- Build + watch files during dev session with `npm start`

### Deploy
- Build on local machine with `npm run build`
- Build and publish to `"gh-pages"` live branch with `npm run deploy`
> see troubleshooting if you encounter an error at this step

### Utilities
- "Something's wrong, I want to start a fresh build" `npm run clean` (delete last build folders)

---

## Troubleshooting
### error during deployment
`gulp-gh-pages` might use the wrong version of `gift` (github cli module). To solve this we need to install manually a different version of `gift`.
```bash
cd node_modules/gulp-gh-pages/
npm install --save gift@0.10.2
cd ../../
npm run deploy
```
---

happy coding !