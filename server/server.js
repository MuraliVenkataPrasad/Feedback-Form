const app = require("express")();
const bodyParser = require("body-parser");
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

var feedback = [
    {
        id: 1,
        title: "Card 1",
        text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    },
];

app.post("/add", async (req, res) => {
    console.log(req.body);
    try {
        const id = feedback[feedback.length - 1].id + 1
        const newfeedback = {
            id: id,
            title: req.body.title,
            text: req.body.content,
        }
        feedback.push(newfeedback);
    } catch (err) {
        res.send({ error: true });
    }
});

app.get("/feedback", async (req, res) => {
    try {
        res.send({ feedback: feedback });
    } catch (err) {
        res.send({ error: true });
    }
});

app.put("/edit", async (req, res) => {
    try {
        const feedbackIndex = feedback.findIndex(item => item.id === req.body.id);
        if (feedbackIndex !== -1) {
            const updatePost = {
                id: req.body.id,
                title: req.body.title,
                text: req.body.content,
            };
            feedback[feedbackIndex] = updatePost;
            res.send({ error: false });
        }
    } catch (err) {
        res.send({ error: true });
    }
});

app.post("/delete", (req, res) => {
    try {
        console.log(req.body)
        feedback = feedback.filter(item => item.id !== req.body.id);
        res.send({ error: false });
    } catch (err) {
        res.send({ error: true });
    }
});


const port = 5000
app.listen(port, () => {
    console.log("app is running on port : ", port);
});