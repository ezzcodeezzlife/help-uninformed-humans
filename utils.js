const randomWords = require("random-words");

let calledHashtags = [];

const generateRandomHashtags = count => {
  let hashtags = [];

  for (let i = 0; i < count; i++) {
    const randomWord = randomWords(1);

    while (calledHashtags.includes(randomWord)) {
      randomWord = randomWords(1);
    }

    hashtags.push(randomWord);
    calledHashtags.push(randomWord);
  }

  return hashtags;
};

module.exports = {
  generateRandomHashtags
};