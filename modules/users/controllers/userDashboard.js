const userDashboard = (reg, res) => {

    res.status(200).json({
        status: "Hello from Dashboard!!"
    })

};


module.exports = userDashboard