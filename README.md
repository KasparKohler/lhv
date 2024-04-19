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
6. Install playwright browsers
```console
  npx playwright install
```
7. Run tests
```console
  npx playwright test
```