
# 🌐 Express.js & APIs (Node.js Backend Notes)

---

## 1. **Why Don’t We Use HTTP Module Directly?**
- The built-in `http` module is low-level and **requires more boilerplate code**.
- It lacks routing, middleware, and features like parsing request bodies.
- Difficult to scale for complex applications.
- That’s why we use frameworks like **Express.js**, which simplify server development.

---

## 2. **Introduction to Express.js**
- **Express.js** is a lightweight **Node.js framework**.
- Makes it easier to build **web servers and APIs**.
- Offers features like:
  - Routing
  - Middleware
  - Request parsing
  - Static file handling

---

## 3. **Creating a Server Using Express**

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from Express server!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

---

## 4. **Express Creates Server but Doesn’t Start It**
- `express()` creates an **application instance**, but the server starts only when `app.listen()` is called.
- This gives flexibility for **configuring routes, middleware, DB** before server startup.

---

## 5. **Starting the Express Server**
```js
app.listen(3000, () => {
  console.log('Server started at http://localhost:3000');
});
```

---

## 6. **Making the First Request**
- Once the server is running:
  - Open your browser or Postman.
  - Go to: `http://localhost:3000/`
  - You'll see: `Hello from Express server!`

---

## 7. **What is an API?**
- API = **Application Programming Interface**.
- A set of rules that allow apps to communicate.
- In web development, APIs define how client & server **send and receive data**.

---

## 8. **Creating an API in Express**

```js
app.get('/api/data', (req, res) => {
  res.json({ message: 'This is an API response' });
});
```

- `GET /api/data` returns a **JSON** response.

---

## 9. **What is `req` (Request) and `res` (Response)?**
- `req`: Represents the **incoming HTTP request**.
  - Contains data like headers, query, params, body, etc.
- `res`: Represents the **server’s response** to that request.
  - Use it to **send data back** to the client (HTML, JSON, etc.).

---

## 10. **What is a REST API?**
- **REST** = Representational State Transfer.
- A set of principles to design **scalable APIs**.
- Uses standard HTTP methods:
  - `GET` – Read data
  - `POST` – Create data
  - `PUT/PATCH` – Update data
  - `DELETE` – Remove data

---

## 11. **Sample REST API Routes in Express**
```js
app.get('/users', getAllUsers);         // Get all users
app.post('/users', createUser);         // Add new user
app.put('/users/:id', updateUser);      // Update user
app.delete('/users/:id', deleteUser);   // Delete user
```

---

## ✅ Summary
| Concept                | Purpose                                    |
|------------------------|--------------------------------------------|
| `http` Module          | Low-level server creation (Node.js)        |
| Express.js             | Framework for building APIs & web servers  |
| `req`, `res`           | Handle requests & responses in routes      |
| API                    | Client-server communication tool           |
| REST API               | Uses HTTP methods to perform CRUD actions  |
