# backend
backend in node express


## Project Setup:

express:
```bash
npm i express
```
nodemon: 
```bash
npm i nodemon
```
prettier
- install prettier as dev dependency
```bash
npm i -D prettier
```
- now make to files `.prettierrc` & `.prettierignore`
cookie-parser: 
- Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
```bash
npm i cookie-parser
```
CORS: 
- Middleware to resolve cors error

```bash
npm i cors
```


---
initial folder structure:
```
- node_modules
- public/
  - temp/
    - .gitkeep
- src/
  - controllers/
  - db/
  - middlewares/
  - models/
  - routes/
  - utils/
  - app.js
  - constants.js
  - index.js
- .env
- .gitignore
- .prettierignore
- .prettierrc
- env.sample
- package-lock.json
- package.json
- README.md
```