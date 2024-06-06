const register = (req, res) => {

    res.status(200).json({
        status: "success",
        message: "Register route hit"
    })

}

module.exports = register