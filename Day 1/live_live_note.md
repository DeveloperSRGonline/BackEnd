# 🚀 Node.js Beginner Notes

This document contains beginner-friendly notes for understanding Node.js, HTTP server creation, and working with NPM packages.

---

## 📌 What is Node.js?

- **Node.js** is a **JavaScript runtime environment**.
- It allows JavaScript to run **outside the browser** (on a server).
- Built on **Chrome's V8 JavaScript engine**.
- If you remove the V8 engine from the browser, JavaScript won’t run.

---

## 🌐 Browser vs Node.js

| Feature       | Browser                   | Node.js                              |
|---------------|----------------------------|----------------------------------------|
| Run JS        | Inside the browser         | Outside the browser                   |
| Engine        | Uses Chrome’s V8 engine    | Also uses V8 engine                   |
| Environment   | Web pages, DOM             | Server-side, no DOM                   |

---

## 📦 What are NPM Packages?

- A **package** is code written by others that you can use.
- You **don’t have to write it** yourself.
- Example: `cat-me` package shows random ASCII cats.

---

## 📁 Common Files and Folders

- `node_modules/`: Stores all installed packages.
- `package.json`: Keeps track of installed packages and dependencies.
- `require()`: Used to import and use the package in your code.

---

## 🧪 How to Use a Package?

1. Install a package:
   ```
   npm install cat-me
   ```

2. Use it in your code:
   ```js
   const catMe = require('cat-me');
   console.log(catMe());
   ```

---

## 🖥️ Creating a Simple HTTP Server

```js
const http = require('http'); // http ko require karna

const server = http.createServer(); // creates a server karna

server.listen(3000, () => {// server ko start karna 
    console.log('Server is running on port 3000');
});
```

- `createServer()` → Creates a basic server.
- `listen(3000)` → Starts the server on port 3000.
- The callback inside `listen()` runs **after the server starts**.

---

## 📂 Folder Structure Suggestion

- Create a **new folder for each class or topic** to stay organized.
