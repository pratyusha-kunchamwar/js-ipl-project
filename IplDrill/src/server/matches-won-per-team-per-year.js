const matchesData = require("../data/matches.json");
const fs = require("fs");

//Number of matches won per team per year in IPL.
function matchesWonPerTeamPerYear() {
  let winnersPerTeam = {};
  for (let match of matchesData) {
    let winner = match.winner;
    let season = match.season;
    if (!winnersPerTeam[winner]) {
      winnersPerTeam[winner] = {}
    }
    if (!winnersPerTeam[winner][season]) { //if the season is not resent
        winnersPerTeam[winner][season] = 1;
      }
      else {
      winnersPerTeam[winner][season] += 1; //if the season is present
      }
    }
  return winnersPerTeam;
}
let matchesWonEachTeamPerYear = matchesWonPerTeamPerYear()

//dump code to json
fs.writeFileSync("../public/output/matchesWonPerTeamPerYear.json", JSON.stringify(matchesWonEachTeamPerYear, null, 2));


