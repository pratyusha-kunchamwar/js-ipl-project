const deliveriesData = require("../data/deliveries.json");
const matchesData = require("../data/matches.json");
const fs = require("fs");

// Find the strike rate of a batsman for each season
function strickRateOfBatsman() {
  let batsManRunsBalls = {};
  for (let match of matchesData) {
    let season = match.season;
    if (!batsManRunsBalls.hasOwnProperty(match.season)) {
      batsManRunsBalls[season] = {};
    }
    for (let delivery of deliveriesData) {
      let matchId = match.id;
      let deliveryId=delivery.match_id

      if (matchId=== deliveryId) {
        let batsman = delivery.batsman;
        let batsmanRuns = Number(delivery.batsman_runs);
        let wideRuns = delivery.wide_runs;
        let noBallRuns=delivery.noball_runs
        if (!batsManRunsBalls[season].hasOwnProperty(batsman)) {
          batsManRunsBalls[season][batsman] = {
            runs: 0,
            ballFaced: 0,
          };
        }
        batsManRunsBalls[season][batsman].runs += batsmanRuns;
        if (wideRuns == 0&&noBallRuns==0) {
          batsManRunsBalls[season][batsman].ballFaced += 1;
        }
      }
    }
  }

  //for StrickRate of each bats man
  let batsmanStrickRate = {};
  for (let season in batsManRunsBalls) {
    batsmanStrickRate[season] = {};
    for (let batsman in batsManRunsBalls[season]) {
      let runs = batsManRunsBalls[season][batsman].runs;
      let ballsFaced = batsManRunsBalls[season][batsman].ballFaced;
      batsmanStrickRate[season][batsman] = 0;

      if ( runs> 0) {
        let strickRate = (runs /ballsFaced ) * 100;
        batsmanStrickRate[season][batsman] += strickRate;
        
      }
    }
  }

  return batsmanStrickRate;
}

let strickRateOfBatsmanData = strickRateOfBatsman();

//dumping code to json.
fs.writeFileSync(
  "../public/output/strikeRateOfBatsMan.json",
  JSON.stringify(strickRateOfBatsmanData, null, 2)
);
