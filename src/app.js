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



app.listen(PORT, ()=>console.log("servidor está no ar")) //portas de 3000 até 5999