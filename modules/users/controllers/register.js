const register = (req, res) => {
    console.log("registe hit")

    res.status(200).json({
        status: "success",
        message: "Register route hit"
    })

}

module.exports = register