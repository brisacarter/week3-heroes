/*
Name: Brisa Carter
Assignment: ICS385 - Week 3 - Hero
Description: Practicing displaying database tables
Date: 02/01/25
*/

//jshint esversion:6
/*added npm jest to write test scripts for the code on index.js
included in package.json
to run test script type: npm test */

const superheroes = require("superheroes");
const supervillains = require("supervillains");
const inpoQuote = require("inspirational-quotes");
const movieQuote = require("popular-movie-quotes");
const famousLastWords = require("famous-last-words");
const { exec } = require("child_process");

// Return random hero, villain, quote, popular movie quote, famous last words
var mySuperHeroName = superheroes.random();
var mySuperVillainName = supervillains.random();
var myQuote = inpoQuote.getRandomQuote();
var popularMovieQuote = movieQuote.getRandomQuote();
var lastWords = famousLastWords[0];

// Log hero, villain, quote, popular movie quote, famous last words to the console
console.log("Super Hero: " + mySuperHeroName);
console.log("Super Villain: " + mySuperVillainName);
console.log("Quote of the Day: " + myQuote);
console.log("Popular Movie Quote: " + popularMovieQuote);
console.log("Famous Last Words: " + lastWords);

// Creates variables for a local web server
const http = require("http");
const hostname = "127.0.0.1";
const port = 3000;

// Added file system (fs) package
const fs = require("fs");
// Define a variable for encoding
const utfEncoding = { encoding: "utf8" };
//added try/error because was having issues writing files
try {
  fs.writeFileSync("file1.txt", "Super Hero: " + mySuperHeroName, utfEncoding);
  fs.writeFileSync(
    "file2.txt",
    "Super Villain: " + mySuperVillainName,
    utfEncoding,
  );
  fs.writeFileSync("file3.txt", "Quote of the Day: " + myQuote, utfEncoding);
  fs.writeFileSync(
    "file4.txt",
    "Popular Movie Quote: " + popularMovieQuote,
    utfEncoding,
  );
  fs.writeFileSync("file5.txt", "Famous Last Words: " + lastWords, utfEncoding);
  console.log("Files written successfully.");
} catch (err) {
  console.error("Error writing files:", err);
}

// Create server and displays the above variables
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end(
    "Super Hero: " +
      mySuperHeroName +
      "\nSuper Villain: " +
      mySuperVillainName +
      "\nQuote of the Day: " +
      myQuote +
      "\nPopular Movie Quote: " +
      popularMovieQuote +
      "\nFamous Last Words: " +
      lastWords,
  );
});

// Only starts the server if not in test environment
//this was necessary to avoide a server error
if (process.env.NODE_ENV !== "test") {
  const hostname = "127.0.0.1";
  const port = 3000;
  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
}

module.exports = server; // Export the server for testing

// Run Jest tests
exec("npm test", (err, stdout, stderr) => {
  if (err) {
    console.error(`Error executing tests: ${err}`);
    return;
  }

  console.log(`Test Results:\n${stdout}`);
  console.error(`Test Errors:\n${stderr}`);
});
