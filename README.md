# Hypin
  
Welcome to Hypin, your new favorite app to review albums across the web.

### Getting Started:
  [Launch the app](https://bty-hypin.herokuapp.com/)
  <br />Search the database for your favorite artist, click the album/single you want to review, and then submit your review underneath. You have to sign in using Google Authentification before you can start reviewing albums and favoriting , but you can still browse around and see what others have to say about your favorite album/single.

### Resources:

**TECHNOLOGIES USED:**
<br />Languages: 
<br /> ![JavaScript Logo.](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black "JS Logo")
![CSS Logo.](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white "CSS Logo")
![HTML Logo.](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white "HTML Logo")
<br /> This project was created using JavaScript, HTML(EJS), and CSS.
<br />Frameworks: 
<br /> ![Bootstrap Logo](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white "Bootstrap Logo")
<br />Hosting: 
 <br /> ![MongoDb.](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white "MongoDb")
![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white "Heroku")

**PROGRAMS USED:**

![VSC Logo.](https://img.shields.io/badge/Visual_Studio-5C2D91?style=for-the-badge&logo=visual%20studio&logoColor=white "VSC Logo")
![GIMP Logo.](https://img.shields.io/badge/gimp-5C5543?style=for-the-badge&logo=gimp&logoColor=white "GIMP Logo")

The code was written using Visual Studio Code and visual assets created using GNU Image Manipulation Program. 

**API USED:**
<br />![Discogs](https://i.imgur.com/nSCTNOf.png "Discogs")


<br />

**INSTRUCTIONS:**

Click on "new" to be redirected to a page where you can search for your favorite artist. You will be prompted to confirm the artis and then sent to the artist's page. You can view the artist's bio, favorite the atist while you're there, and click on the album picture to be taken to that page and give a review or see other people's reviews.


  **ROSE AND THORN:**
<br />Most challenging and rewarding piece of code.
<details><summary>Sifting throught the API's database and grabbing the correct information to be used for our app.</summary>

```
async function create(req, res, next) {
    const correctArtist = req.body.correctArtist;
    if (correctArtist) {
        const artistId = req.body.artistId;
        try {
            await fetch(`${ROOT_URL}/artists/${artistId}?key=${process.env.CONSUMER_KEY}&secret=${process.env.CONSUMER_SECRET}`)
            .then(result => result.json())
            .then(async result => {
                function dataHelper(data) {
                    if (data) {
                        return {
                            height: data[0].height, 
                            width: data[0].width, 
                            url: data[0].resource_url
                        } 
                    }
                }
                async function releaseHelper(url, id) {
                    const thumb = await fetch(`${url}/masters/${id}?key=${process.env.CONSUMER_KEY}&secret=${process.env.CONSUMER_SECRET}`)
                    .then(result => result.json())
                    .then(result => {
                        if (!result.images) {
                            return ''
                        } else if (result.images.length) {
                            return result.images[0].uri
                        } else {
                            return ''
                        }
                    });
                    return thumb
                }
                async function releasesHelper(url, id, order) {
                    const releasesArr = [];
                    await fetch(`${url}/artists/${id}/releases?${order}?key=${process.env.CONSUMER_KEY}&secret=${process.env.CONSUMER_SECRET}}`)
                        .then(releasesData => releasesData .json())
                        .then(async releasesData  => {
                            for (const releaseData of releasesData.releases) {
                                if (releaseData.type === 'master') {
                                const release = {
                                    title: releaseData.title,
                                    year: releaseData.year,
                                    thumb: await releaseHelper(ROOT_URL, releaseData.id),
                                    reviews: [],
                                    artist: releaseData.artist,
                                    id: releaseData.id
                                };
                                releasesArr.push(release);
                                }
                            }
                        })
                    return releasesArr
                } 
                const artistData = new Artist({
                    artistId: result.id,
                    name: result.name,
                    profile: result.profile,
                    image: dataHelper(result.images),
                    releases: await releasesHelper(ROOT_URL, artistId, SORT_ORDER)
                });
                await artistData.save()
                    .then(res.redirect(`/artists/${artistData._id}`));
            });
        } catch(err) {
            console.log(`Error in create function: ${err}`);
        }
    } else {
        res.redirect('/artists/new'); 
    }
}
```
</details>
<br /> This is just one of many times we had to grab information from the API, but it was the first hurdle we had to overcome.
  
 ### Screenshots:

![](https://i.imgur.com/6CGlQml.png)

![](https://i.imgur.com/KSsHRS2.png)

![](https://i.imgur.com/FiOzwqk.png)

![](https://i.imgur.com/GpuLjhL.png)

### Roadmap

- Stylizing the user's favorites page. 

- Making the user page more user centric.

- Implementing dynamic content to the user page. (randomized favorite albums/artists popping up on the page.)

- Recoloring footer.

- Using a different API that's more streamilined 
