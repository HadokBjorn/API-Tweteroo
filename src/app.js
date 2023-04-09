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
    if(typeof username !== "string" || typeof avatar !== "string") {
        res.status(400).send("Todos os campos são obrigatórios!");
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
    if(typeof username !== "string" || typeof tweet !== "string") {
        res.status(400).send("Todos os campos são obrigatórios!");
    }
    const {avatar} = existUser;

    tweets.push({username, avatar, tweet});
    res.status(201).send("ok");
})

app.get("/tweets", (req, res) =>{
    const { USERNAME } = req.query;
    const { page } = req.query;

    if(page < 1){ return res.status(400).send("Informe uma página válida!") }

    if(USERNAME){
        const tweetsFiltered = tweets.filter(
            (t) => t.username === USERNAME
        )
        return res.send(tweetsFiltered);
    }

    if(tweets.length >= 10){
        const recentTweets = [];

        for(let i = tweets.length-1; i >= tweets.length-10; i--){
            recentTweets.push(tweets[i]);
        }

        return res.send(recentTweets);
    }
    
    res.send(tweets);
})


app.listen(PORT, ()=>console.log("servidor está no ar")) //portas de 3000 até 5999