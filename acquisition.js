require("@tensorflow/tfjs-node");
const Insta = require("scraper-instagram");
const TeachableMachine = require("@sashido/teachablemachine-node");
const InstaClient = new Insta();
const model = new TeachableMachine({
  modelUrl: "https://teachablemachine.withgoogle.com/models/-2pWMDJhC/", //T-SZUhtvO
});
const mongoose = require("mongoose");
var foundusers = require("./user_model.js");
require("dotenv").config();

const uri = process.env.MONGOURI;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => console.log(err));

let collection = [];

async function findAndClassify(hashtag) {
  await InstaClient.getHashtag(hashtag)
    .then((hashtag) => (collection = hashtag.lastPosts))
    .catch((err) => console.error(err));

  collection.forEach((element) =>
    model
      .classify({
        imageUrl: element.thumbnail,
      })
      .then((predictions) => {
        //console.log(predictions);  //ALL RPEDICTIONS
        //console.log(element.thumbnail);

        predictions.forEach(async function (elementinpre) {
          if (
            elementinpre.class == "vaccinationinfo" &&
            elementinpre.score == 1
          ) {
            //console.log("Link:", element.thumbnail);
            //console.log("shortcode:", element.shortcode);

            console.log(predictions); //SELECTED PREDICTIONS
            console.log(element.thumbnail);

            await foundusers.create({
              thumbnailurl: element.thumbnail,
              score: elementinpre.score,
              url: "https://www.instagram.com/p/" + element.shortcode,
              hashtag: hashtag,
              notified: "no",
              shortcode: element.shortcode,
            });
            console.log("-> creation of new entry foundusers");
          }
        });
      })
      .catch((e) => {
        console.log("ERROR in Classification", e);
      })
  );
}

async function acquisitionRound() {

  await findAndClassify("vaccination");
  await findAndClassify("vacunado");
  await findAndClassify("vacunada");
  await findAndClassify("vacciné");
  await findAndClassify("vaccinato");
  await findAndClassify("vaccines");
  await findAndClassify("getvaccinated");
  await findAndClassify("igotvaccinated");
  await findAndClassify("accinatedagainstcovid19");
  await findAndClassify("vaccinatedandhappy");
  await findAndClassify("vaccineswork");
  await findAndClassify("covidvacccine");
  await findAndClassify("vaccination");
  await findAndClassify("geimpft");
  
  await console.log("DONE!");
}

setTimeout(function () {
  console.log("STARTING ANTOHER ROUND OF ACQUISITION");
  acquisitionRound();
}, 1000 * 60 * 60 * 24); //24 hours
