# Mess Backend (Auth0 + MVC)

Node.js backend for a Mess Management system using **Express**, **MongoDB**, and **Auth0 JWT authentication**.  
Follows a clean **MVC + Service architecture** so new features can be added easily.

---

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- Auth0 (JWT Authentication)

---

## Folder Structure

backend/
├── src/
│ ├── config/ # Database & Auth0 configuration
│ ├── models/ # MongoDB schemas
│ ├── services/ # Business logic layer
│ ├── controllers/ # Request/response handlers
│ ├── routes/ # API route definitions
│ ├── middlewares/ # Auth & common middleware
│ ├── app.js # Express app setup
│ └── server.js # Application entry point
├── .env # Environment variables
├── package.json
└── README.md



---

## Environment Variables

Create a `.env` file in the `backend/` folder.

PORT=5000
AUTH0_DOMAIN=dev-sr21y2n6y7zoznzf.us.auth0.com
AUTH0_AUDIENCE=https://mess-api.com
MONGO_URI=mongodb+srv://sahilnegipw_db_user:B1TTd9uxXzZu5LnX@cluster0.wipr7cx.mongodb.net/messDB?retryWrites=true&w=majority

---


> Do NOT commit `.env` to version control.

---

## Install & Run

## Install dependencies:

npm install

## Start the server:

node src/server.js

Server runs at:

http://localhost:5000


---

## Authentication Flow

1. Frontend authenticates user using Auth0
2. Auth0 issues a JWT
3. Frontend sends token in request header:

Authorization: Bearer <JWT>
4. Backend verifies JWT using Auth0 middleware

---

## Test API (Postman)

Endpoint:

GET /auth/me

Headers:
Authorization: Bearer <JWT>

Successful response confirms authentication.

---



Frontend Login (Auth0)
 ↓
JWT issued
 ↓
Frontend → Authorization: Bearer <JWT>
 ↓
auth.middleware.js (verify)
 ↓
auth.controller.js
 ↓
auth.service.js
 ↓
User synced in DB
 ↓
Response





🧪 TEST USING POSTMAN
Request
GET http://localhost:5000/auth/me

Headers
Authorization: Bearer <JWT_TOKEN>

Response
{
  "message": "Authenticated",
  "user": {
    "auth0Id": "auth0|123",
    "email": "test@gmail.com",
    "role": "user"
  }
}
