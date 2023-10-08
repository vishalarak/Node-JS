const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const router = require("./Routes/routes");
app.use(router);

app.listen(3000, () => {
    console.log("Server started on port no 3000...");
})