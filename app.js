const express=require('express');

const app=new express();

let port=3080;

const loginRouter=require("./routers/login");

app.use(loginRouter);

app.listen(port, () => console.log(`This server is running on port no ${port}`));


