# Mini Message Board

A tiny Express message board with EJS views and Postgres storage.

## Run it

```bash
npm install
npm run start
```

The server starts on `http://localhost:3000`.

## Environment

Create a `.env` file with:

```
DATABASE_URL=postgresql://user:pass@host:5432/db
```

Without it, the app still starts but messages won't persist.

## Structure

| File | What it does |
|------|--------------|
| `app.js` | Express setup, middleware, route mounting, server listener |
| `db.js` | Shared Postgres connection pool and table setup |
| `models/messages.js` | Message queries (list, by user, by id, insert) |
| `controllers/messageController.js` | Route handlers for messages, forms, and username cookies |
| `controllers/currentUser.js` | Reads saved username from cookie on every request |
| `controllers/notFound.js` | 404 middleware that passes to the error handler |
| `controllers/errorHandler.js` | Express error middleware (4-arg, registered last) |
| `errors/AppError.js` | Custom error class with an HTTP status code |
| `routes/indexRouter.js` | `GET /`, `GET /messages/:id` |
| `routes/newMessageRouter.js` | `GET /new`, `GET /new/reset-name`, `POST /new` |
| `routes/userRouter.js` | `GET /users/:name` |
| `views/*.ejs` | Page templates |
| `public/styles.css` | Stylesheet |

## Features

- List messages, view individual messages, post new messages
- Filter messages by user (`/users/:name`)
- Remembers your name in a cookie so you don't retype it
- "Reset name" clears the cookie so you can pick a new one
