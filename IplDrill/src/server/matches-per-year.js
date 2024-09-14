const matchesData = require("../data/matches.json");
const fs = require("fs");

//Number of matches played per year for all the years in IPL.
function getNofMatchesPerYear() {
  let nofMatches = {};
  for (let match of matchesData) {
    let season = match.season;
    //if object Not Have season we Add once to season ,else Increment season value
    if (nofMatches[season]) {
      nofMatches[season] += 1;
    }
    else {
      nofMatches[season] = 1;
    }
  }
  return nofMatches;
}
let matchesPerYear = getNofMatchesPerYear();

// dump to json file
fs.writeFileSync( "../public/output/matchesPerYear.json", JSON.stringify(matchesPerYear, null, 2));


