const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.use("/api/products",   require("./routes/products"));
app.use("/api/orders",     require("./routes/orders"));
app.use("/api/payment",    require("./routes/payments"));
app.use("/api/categories", require("./routes/categories").router);

app.listen(process.env.PORT || 5000, () =>
  console.log("Server running on port 5000")
);
