const matchesData = require("../data/matches.json");
const fs = require("fs");

// Find a player who has won the highest number of Player of the Match awards for each season
function playerWithHighestNofPlayersOfMatch() {
  let eachSeasonPlayerOfMatch = {};
  for (let match of matchesData) {
    let season = match.season;
    if (!eachSeasonPlayerOfMatch.hasOwnProperty(season)) {
      eachSeasonPlayerOfMatch[season] = {};
    }
    let PlayerOfMatch = match.player_of_match;
    if (!eachSeasonPlayerOfMatch[season].hasOwnProperty(PlayerOfMatch)) {
      eachSeasonPlayerOfMatch[season][PlayerOfMatch] = 0;
    }
    eachSeasonPlayerOfMatch[season][PlayerOfMatch] += 1;
  }
//HighestNof PlayerOfMatch In each Season
  let highestNofPlayerOfMatch = {};
  for (let season in eachSeasonPlayerOfMatch) {
    highestNofPlayerOfMatch[season] = {};
    let maxAwards = 0;
    let highestPlayer = 0;
   
    for (let player in eachSeasonPlayerOfMatch[season]) {
      if (eachSeasonPlayerOfMatch[season][player] > maxAwards) {
        maxAwards = eachSeasonPlayerOfMatch[season][player];
        highestPlayer=player
      }
      highestNofPlayerOfMatch[season] = { [highestPlayer]: maxAwards };
    }
  }
  return highestNofPlayerOfMatch;
}
let playersHighestNofPlayerOfMatch = playerWithHighestNofPlayersOfMatch();

//dump the code to json
fs.writeFileSync("../public/output/playerWithHighestNofPlayerOfMatches.json",JSON.stringify(playersHighestNofPlayerOfMatch, null, 2));
