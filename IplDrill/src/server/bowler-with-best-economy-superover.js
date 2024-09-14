const deliveriesData = require("../data/deliveries.json");
const fs = require("fs");

// Find the bowler with the best economy in super overs
function bowlerWithBestEconomySuPerOver() {
  let bowlersData = {};
  for (let delivery of deliveriesData) {
    let superOver = Number(delivery.is_super_over);
    let bowler = delivery.bowler;
    let totalRuns = Number(delivery.total_runs);
    let wideRuns = delivery.wide_runs;
    let noBallRuns = delivery.noball_runs;
    let legBuyRuns = delivery.legbye_runs;
  
    if (superOver > 0) {
      if (!bowlersData.hasOwnProperty(bowler)) {
        bowlersData[bowler] = {
          totalRuns: 0,
          nofBalls: 0,
        };
      }
      if (noBallRuns == 0 && legBuyRuns) {
        bowlersData[bowler].totalRuns += totalRuns;
      }
      if (wideRuns === "0" && noBallRuns === "0") {
        bowlersData[bowler].nofBalls += 1;
      }
    }
  }
//Best Economy Bowler
  let bestEconomyBowlers = {
    bowler: null,
    bestEconomyRate: Number.MAX_SAFE_INTEGER,
  };
  for (let bowler in bowlersData) {
    let overs = bowlersData[bowler].nofBalls / 6;
    let economyRate = bowlersData[bowler].totalRuns / overs;
    if (bestEconomyBowlers.bestEconomyRate > economyRate) {
      bestEconomyBowlers.bowler = bowler;
      bestEconomyBowlers.bestEconomyRate = economyRate;
    }
  }

  return bestEconomyBowlers;
}
let bestBowlerData = bowlerWithBestEconomySuPerOver();

//dumpCode to Json
fs.writeFileSync(
  "../public/output/bowlerWithBestEconomySuperOver.json",
  JSON.stringify(bestBowlerData, null, 2)
);
