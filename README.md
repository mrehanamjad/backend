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
mongoose-aggregate-paginate-v2
- It’s a Mongoose plugin that adds a .aggregatePaginate() method to your Mongoose models.
- This is especially useful when you're using Model.aggregate(), because the normal .paginate() plugin doesn't work with aggregate().
```bash
npm i mongoose-aggregate-paginate-v2
```
bcrypt
- for password hashing
```bash 
npm i bcrypt
```
jsonwebtoken:
```bash 
npm i jsonwebtoken
```
multer: 
- handleing multipart/form-data  file upload
```bash
npm i multer
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

## [Model link](https://app.eraser.io/workspace/rIcLf0VAL9Q4JxebA3Rl?origin=share)

## for more : [Visit Repo](https://github.com/hiteshchoudhary/chai-backend) 