const data = require("./data.json");
const fs = require("fs");

const newData = data.map(d => ({...d, reported: "historic"}));

fs.writeFile("./newData.json", JSON.stringify(newData), "utf8", function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});