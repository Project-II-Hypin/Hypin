const User = require("../models/user");

async function show(req, res) {
    const user = await User.findById(req.user._id);
    res.render("users/show", { title:`${user.name}'s Page`, user });
}

module.exports = {
    show,
};