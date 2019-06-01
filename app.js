const express=require('express');

const app=new express();

let port=3080;

const loginRouter=require("./routers/login");

app.use(loginRouter);

console.log("Hello world");

app.listen(port, () => console.log(`This server is running on port no ${port}`));





