const deliveriesData = require("../data/deliveries.json");
const matchesData = require("../data/matches.json");
const fs = require("fs");

function top10EconomicalBowlers() {
  let bowlersData = {};
  let season2015MatchIds = new Set();
  //all matches ids in 2015
  for (let match of matchesData) {
    if (match.season == 2015) {
      season2015MatchIds.add(match.id);
    }
  }
  //we get the dataOf bowler with nofBalls,nofRuns
  for (let delivery of deliveriesData) {
    let matchId = delivery.match_id;
    let bowler = delivery.bowler;
    let totalRuns = Number(delivery.total_runs);
    let wideRuns = delivery.wide_runs;
    let noBallRuns = delivery.noball_runs;
    let legBuyRuns = delivery.legbye_runs;

    if (season2015MatchIds.has(matchId)) {
      if (!bowlersData.hasOwnProperty(bowler)) {
       bowlersData[bowler] = {};
       bowlersData[bowler].runs = 0;
       bowlersData[bowler].nofBalls = 0;
      }
      if (noBallRuns === 0 && legBuyRuns===0) {
        bowlersData[bowler].runs += totalRuns;
      }
      if (wideRuns === "0" && noBallRuns === "0") {
       bowlersData[bowler].nofBalls += 1;
      }
    }
  }
//for each one creating economy rate
  let economicalBowlers = [];
  for (let bowler in bowlersData) {
    let overs = bowlersData[bowler].nofBalls / 6;
    let economyRate = Infinity;
    if (overs > 0) {
       economyRate = bowlersData[bowler].runs / overs;
    }
   economicalBowlers.push({ bowler, economyRate });
  }
//top10 bowlers Data
 economicalBowlers.sort((a, b) => a.economyRate - b.economyRate);
  let top10Bowlers = economicalBowlers.slice(0, 10);
  return top10Bowlers;
}
let top10BowlersData= top10EconomicalBowlers();


//for dumping file
fs.writeFileSync("../public/output/top10EconomicalBowlers.json",JSON.stringify(top10BowlersData, null, 2));
