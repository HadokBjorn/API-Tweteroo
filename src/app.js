import express from "express";
import cors from "cors";


const app = express();
const PORT = 5000;
const users = [];
const tweets = [];
app.use(cors());
app.use(express.json());

app.post("/sign-up", (req, res) =>{
    const {username, avatar} = req.body;
    if(!username || !avatar){
        return res.sendStatus(400);
    }
    if(typeof username !== "string" && typeof avatar !== "string") {
        res.send("Todos os campos são obrigatórios!");
    }
    users.push({username, avatar})
    res.status(201).send("ok");
})
app.post("/tweets", (req, res) =>{
    const {username, tweet} = req.body;
    const existUser = users.find(u => u.username === username);
    if(!username || !tweet){
        return res.sendStatus(400);
    }
    if(!existUser){
        return res.sendStatus(401);
    }
    if(typeof username !== "string" && typeof tweet !== "string") {
        res.send("Todos os campos são obrigatórios!");
    }
    const {avatar} = existUser;

    tweets.push({username, avatar, tweet});
    res.status(201).send("ok");
})


app.listen(PORT, ()=>console.log("servidor está no ar")) //portas de 3000 até 5999