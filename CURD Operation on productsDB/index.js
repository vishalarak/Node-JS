const exppress = require("express");
const app = exppress();

const cors = require("cors");
app.use(cors());

const router = require("./routers/routers");
app.use(router);

const port = 3000;
app.listen(port,()=>{
    console.log("Server strat on port no "+ port);
})