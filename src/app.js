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
    const { tweet } = req.body;
    const { user } = req.headers;
    const existUser = users.find(u => u.username === user);
    if(!user || !tweet){
        return res.sendStatus(400);
    }
    if(!existUser){
        return res.sendStatus(401);
    }
    if(typeof user !== "string" || typeof tweet !== "string") {
        res.status(400).send("Todos os campos são obrigatórios!");
    }
    const {avatar} = existUser;

    tweets.push({
        username: user,
        avatar,
        tweet
    });
    res.status(201).send("ok");
})

app.get("/tweets", (req, res) =>{
    const { page } = req.query;
    const numberPage = parseInt(page);

    if(numberPage < 1){ return res.status(400).send("Informe uma página válida!") }

    if(numberPage >= 1){ 
        const interator = numberPage * 10;
        const initial = interator - 10;
        const tweetPage =  tweets.reverse().slice((initial),interator)
        return res.send(tweetPage);
    }

    if(tweets.length >= 10 && !page){
        const recentTweets = [];
        

        for(let i = tweets.length-1; i >= tweets.length-10; i--){
            recentTweets.push(tweets[i]);
        }

        return res.send(recentTweets);
    }
    
    res.send(tweets);
})


app.get("/tweets/:USERNAME", (req, res) =>{
    const { USERNAME } = req.params;

    //USERNAME && tweets.find(t => t.username === USERNAME)

    if(USERNAME){
        const tweetsFiltered = tweets.filter(
            (t) => t.username === USERNAME
        )
        return res.status(200).send(tweetsFiltered);
    }
    //res.status(404).send("Usuário não encontrado");
})


app.listen(PORT, ()=>console.log("servidor está no ar")) //portas de 3000 até 5999