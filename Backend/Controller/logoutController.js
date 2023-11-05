const logoutController = (req, res) => {
    res.cookie('token', '').status(200).json('ok')
}

module.exports = logoutController