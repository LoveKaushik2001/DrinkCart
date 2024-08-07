import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import drinkcartRoutes from "./routes/drinkcart.js";

const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin: "*",
    // origin: ["https://drink-cart.vercel.app/"],
    methods: ["POST", "GET", "PATCH"],
    credentials: true,
  })
);

app.get("/", (req, res) => res.send("Hello to DrinkCart"));
app.use("/drinkcart", drinkcartRoutes);

const CONNECTION_URL =
  "mongodb+srv://drinkcartadmin:drinkcartadmin123@cluster0.h0oi1nv.mongodb.net/dev?retryWrites=true&w=majority";
const PORT = process.env.PORT || 3000;

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.error(error.message));

export default app;
