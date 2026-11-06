const path = require("node:path");
const express = require("express");
const indexRouter = require("./routes/indexRouter");
const newMessageRouter = require("./routes/newMessageRouter");
const userRouter = require("./routes/userRouter");
const currentUser = require("./controllers/currentUser");
const notFound = require("./controllers/notFound");
const errorHandler = require("./controllers/errorHandler");
const { setupDatabase } = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Remember the saved username for every page.
app.use(currentUser);

app.use("/", indexRouter);
app.use("/new", newMessageRouter);
app.use("/users", userRouter);

// Error handling must come last, after every route.
app.use(notFound);
app.use(errorHandler);

// Make the message table ready first, then start listening.
setupDatabase()
  .then(() => {
    console.log("Database ready.");
  })
  .catch((err) => {
    console.warn("Database setup skipped:", err.message);
  });

app.listen(PORT, () => {
  console.log(`Mini Message Board running on http://localhost:${PORT}`);
});
