// Allows Legacy users to use fetch:
const fetch = require('node-fetch');

const Artist = require("../models/artist")

async function show(req, res) {
    const idArr = req.params.id.split(':');
    await Artist.findById(idArr[1])
        .then(result => {
            const release = result.releases.find( rel => `${rel._id}` === idArr[0]);
            res.render('releases/show', { title:`${release.title}`, release })
        });
}

module.exports = {
    show,
};