// // Define the Discogs API endpoint and your API key
// const discogsEndpoint = 'https://api.discogs.com';
// const discogsApiKey = 'YOUR_DISCOGS_API_KEY';
// const fetch = require('node-fetch')

// // Define a function to fetch the release data from the Discogs API
// function fetchReleaseData(releaseId) {
//   // Construct the API endpoint URL for the release
//   const url = `${discogsEndpoint}/releases/${releaseId}?key=${discogsApiKey}`;

//   // Fetch the release data using the API endpoint
//   return fetch(url)
//     .then(response => response.json())
//     .then(data => {
//       // Extract the relevant information from the response
//       const release = {
//         title: data.title,
//         artist: data.artists[0].name,
//         year: data.year,
//         // Add any other properties from the API data as needed
//       };

//       // Call a function to create a new record
//       createRecord(release);
//     })
//     .catch(error => console.error(error));
// }

// // Define a function to create a new record
// function createRecord(record) {
//   // Use your application's database or API to create a new record
//   // This is just an example, so the implementation will depend on your application
//   console.log(`Creating new record "${record.title}" by ${record.artist} from ${record.year}...`);
// }

// // Call the fetchReleaseData function with a release ID
// fetchReleaseData(1078373);

// Set up the Discogs API endpoint and key
const endpoint = 'https://api.discogs.com';
const apiKey = 'YOUR_API_KEY_HERE';
const fetch = require('node-fetch')

// Set up the artist name to search for
const artistName = 'Nirvana'; // Example artist name

// Make a GET request to the Discogs API endpoint to search for the artist
fetch(`${endpoint}/database/search?q=${artistName}&type=artist&key=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    // Extract the artist ID from the API response
    const artistId = data.results[0].id;

    // Make a GET request to the Discogs API endpoint to retrieve the artist's album releases
    return fetch(`${endpoint}/artists/${artistId}/releases?key=${apiKey}&per_page=100`);
  })
  .then(response => response.json())
  .then(data => {
    // Extract the relevant information from the API response and store it in an array
    const releases = data.releases.map(release => ({
      title: release.title,
      year: release.year,
      type: release.type,
      // Add any other properties from the API data as needed
    }));

    // Use the releases array in your application as needed
    console.log(`Found ${releases.length} album releases for ${artistName}:`);
    console.log(releases);
  })
  .catch(error => console.error(error));


  /*  // DO NOT DELETE!!! This file lived for a long time. It gets to stay. <'-'> //  */