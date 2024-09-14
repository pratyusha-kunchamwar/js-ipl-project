const fs = require("fs"); 
const csv = require("csv-parser"); 

const results = [];


fs.createReadStream("matches.csv") 
  .pipe(csv())
  .on("data", (row) => {
    results.push(row); 
  })
  .on("end", () => {
    console.log("CSV file successfully processed.");

 fs.writeFile("matches.json", JSON.stringify(results, null, 2), (err) => {
      if (err) {
        console.error("Error writing to file:", err);
      } else {
        console.log("Data successfully written to data.json");
      }
    });
  });
