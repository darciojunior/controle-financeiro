import express from "express";
const app = express();

import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./db/connect.js";

//routers
import authRouter from "./routes/authRoutes.js";
import financeRouter from "./routes/financesRoutes.js";

//middleware
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";
import authenticateUser from "./middleware/auth.js";

app.use(express.json());

app.get("/api/v1", (req, res) => {
  res.json({ msg: "Welcome!" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/finances", authenticateUser, financeRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port: ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
