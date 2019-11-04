const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json({ extended: false }));

const postsRoute = require("./routes/postsRoute");
app.use("/api/posts", postsRoute);

const PORT = process.env.PORT;

const connectDB = require("./data/db");
connectDB().then(() =>
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
);
