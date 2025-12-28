const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// REGISTER
app.post("/register", (req, res) => {
    const { username, password } = req.body;

    fs.appendFile("users.txt", `${username} ${password}\n`, (err) => {
        if (err) {
            res.status(500).send("Error registering user");
        } else {
            res.send("Registration successful");
        }
    });
});

// LOGIN
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    fs.readFile("users.txt", "utf8", (err, data) => {
        if (err) {
            res.status(500).send("Error reading file");
            return;
        }

        const users = data.split("\n");
        for (let user of users) {
            const [u, p] = user.split(" ");
            if (u === username && p === password) {
                res.send("Login successful");
                return;
            }
        }
        res.status(401).send("Invalid credentials");
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
