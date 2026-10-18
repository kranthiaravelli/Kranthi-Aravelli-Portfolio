const express = require("express");
const app = express();

const path = require("path");

const port = 3000;

app.use(express.static(path.join(__dirname, "/public/css")));
app.use(express.static(path.join(__dirname, "/public/js")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
    res.send("Backend running successfully");
});

app.get("/home", (req, res) => {
    res.send("You Reached Home route successfully!");
});

app.get("/ig/:username", (req, res) => {
    const {username} = req.params;
    const instaData = require("./data.json");
    const data = instaData[username];
    if(data) {
        res.render("instagram.ejs", { data });
    } else {
        res.render("error.ejs");
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})