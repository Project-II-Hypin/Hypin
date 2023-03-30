// Allows Legacy users to use fetch:
const fetch = require('node-fetch');

const User = require("../models/user");

async function show(req, res) {
    const user = await User.findById(req.params.id);
    res.render("users/:id/show", user)
}

module.exports = {
    show,
};