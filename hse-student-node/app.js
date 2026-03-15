require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const Feedback = require("./models/Feedback");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB подключена");
})
.catch(err => {
    console.log("Ошибка подключения MongoDB:", err);
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/feedback", (req, res) => {
    res.render("feedback");
});

app.post("/submit", async (req, res) => {

    try {

        const feedback = new Feedback({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            date: req.body.date,
            topic: req.body.topic,
            channel: req.body.channel,
            time: req.body.time,
            message: req.body.message,
            agree: req.body.agree === "on"
        });

        await feedback.save();

        res.redirect("/messages");

    } catch (error) {

        console.log(error);
        res.status(500).send("Ошибка сохранения");

    }

});

app.get("/messages", async (req, res) => {

    try {

        const messages = await Feedback.find().sort({ createdAt: -1 });

        res.render("messages", { messages });

    } catch (error) {

        res.status(500).send("Ошибка получения данных");

    }

});

app.listen(PORT, () => {
    console.log(`Server started: http://localhost:${PORT}`);
});