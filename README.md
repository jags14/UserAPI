# User Management API
A production-ready backend API built with Node.js and Express, supporting authentication, authorization, pagination, filtering, and secure user management.

## Features
- JWT Authentication (Access + Refresh Tokens)
- Role-Based Authorization (Admin/User)
- Secure Password Hashing (bcrypt)
- Rate Limiting (Global + Auth-specific)
- Structured Logging with Request ID
- Pagination & Filtering
- Centralized Error Handling
- Input Validation Middleware
- API Documentation with Swagger
- Modular Architecture (feature-based)

## Tech Stack
- Node.js
- Express.js
- SQLite(better-sqlite)
- JWT (authentication)
- bcrypt (password hashing)
- Swagger (API Documentation)

## Project Structure

src/
    modules/
        auth/
        user/
    middlewares/
    utils/
    errors/
    db/
    docs/

## Project Setup
1. Clone repository
2. Install dependencies

    npm install

3. Start server
    npm run dev

## API docs

Visit:
http://localhost:3000/docs

## Example endpoints

POST /api/v1/auth/login
GET /api/v1/users
POST /api/v1/users

## Environment variables
SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

## Future Improvements
- Add caching
- Add unit and Integration tests
- Deploy to cloud (AWS / Render)
- Add Email Verification