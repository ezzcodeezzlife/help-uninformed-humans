// https://github.com/Andrew781123/ig-scraping-glide

const Insta = require("scraper-instagram");
const InstaClient = new Insta();
const fs = require("fs");
require("./ig-auth")(InstaClient);
//const { hashtags } = require("./resources");
const randomWords = require("random-words");
const { generateRandomHashtags } = require("./utils");

//get details of provided hashtag
// InstaClient.getHashtag("travel").then(data => {
//   console.log(`number of featured posts: ${data.featuredPosts.length}`);
//   console.log(`number of last posts: ${data.lastPosts.length}`);

//   //dataJson = JSON.stringify(data);
//   //fs.writeFile("result.json", dataJson, "utf8", err => console.log(err));
// });

//get similar hashtags and their number of posts
// InstaClient.searchHashtag("travel").then(result => {
//   resultJson = JSON.stringify(result);
//   fs.writeFile("search-result.json", resultJson, "utf8", err =>
//     console.log(err)
//   );
// });

//testing limit **NOT IDEAL**
// for (let i = 0; i < hashtags.length; i++) {
//   InstaClient.getHashtag("travel")
//     .then(result => {
//       console.log(`number: ${i + 1} done`);
//     })
//     .catch(err => console.log(err));
// }

const callAPI = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("api response");
    }, 2000);
  });
};

let numberOfSuccessfulAPICall = 0;

const uniqueHashtags = generateRandomHashtags(200);

for (const hashtag of uniqueHashtags) {
  //random number from 5 - 11
  const randomTime = Math.random() * 6 + 5;

  setTimeout(() => {
    console.log(`finding hashtag: ${hashtag}`);

    InstaClient.getHashtag(hashtag)
      .then(result => {
        console.log("respose");
        numberOfSuccessfulAPICall++;
      })
      .catch(err => console.log(err));
  }, randomTime * 1000);
}

setTimeout(() => {
    console.log("numberOfSuccessfulAPICall:");
  console.log(numberOfSuccessfulAPICall);
}, 20 * 1000);