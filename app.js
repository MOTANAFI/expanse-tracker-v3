const express = require("express");
const register = require("./modules/users/controllers/register");


const app = express();

app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "app running successfully"
    })
})
app.post("/api/register", register)


app.listen(8000, () => console.log("Server running succesfully"))