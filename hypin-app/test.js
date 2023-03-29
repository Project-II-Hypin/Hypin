
//res.render('releases/show', { title:`${result.title}`, result })
// req.params.id

const test = '';

const ArtistExports = require("./models/artist");

async function show(req, res) {
    await ArtistExports.Release.findById('642370074d1dc2a948eacbd5')
        .then(result => {
            console.log(result);
        });
}

 show();

// console.log(Artist);