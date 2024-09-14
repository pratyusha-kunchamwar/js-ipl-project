const matchesData = require("../data/matches.json");
const fs = require("fs");

// Find the number of times each team won the toss and also won the match
function teamWonTossWonMatch() {
  let nofTimesTeamWin = {};
  for (let match of matchesData) {
    let winner = match.winner;
    let tossWinner = match.toss_winner;
    if (winner === tossWinner) { 
      if (!nofTimesTeamWin.hasOwnProperty(winner)) {
        nofTimesTeamWin[winner] = 0;
      }
      nofTimesTeamWin[winner] += 1;
    }
  }
  return nofTimesTeamWin;
}
let teamWOnTossWonMatchData= teamWonTossWonMatch();

//dumping
fs.writeFileSync("../public/output/teamWOnTossWonMatch.json", JSON.stringify(teamWOnTossWonMatchData, null, 2));
