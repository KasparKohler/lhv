[![Playwright Tests](https://github.com/KasparKohler/lhv/actions/workflows/playwright.yml/badge.svg?branch=main)](https://github.com/KasparKohler/lhv/actions/workflows/playwright.yml)
# LHV testülesanne
### Setup on Windows machine
1. Install node.js
2. Install bash
3. Clone main branch from bash
```console
  git clone https://github.com/KasparKohler/lhv.git
```
4. Open cloned folder from bash
```console
  cd lhv
```
5. Install dependencies from package.json
```console
  npm ci
```
6. Install browsers
```console
  npx playwright install --with-deps
```
7. Run tests with default environment
```console
  npx playwright test
```
8. Run tests with given environment
```console
  NODE_ENV=live npx playwright test
```