
const express = require("express");
const app = express();

var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

//load in the JSON and then put the metadata by fieldname in the positions array
const fs = require('fs');
let testing_sites = JSON.parse(fs.readFileSync("./data/testing_sites.json"));
console.log("testing_sites",testing_sites)

let raw_voting_sites = fs.readFileSync("./data/voting_sites.json");
var voting_sites = JSON.parse(raw_voting_sites);
var metadata = voting_sites.meta.view.columns.filter(item => item.position > 0);

//create positions, and map over the metadata to create fieldnames and positions
var positions = [];
Object.keys(metadata).map(key => positions[[metadata[key].fieldName]] = metadata[key].position + 7)
// console.log(positions)
const borough_pos = positions[Object.keys(positions).filter(key => key == "borough")];
const latitude_pos = positions[Object.keys(positions).filter(key => key == "latitude")];
const longitude_pos = positions[Object.keys(positions).filter(key => key == "longitude")];
const site_name_pos = positions[Object.keys(positions).filter(key => key == "site_name")];
var brooklyn_voting_sites = voting_sites.data.filter(item => item[borough_pos] == "BROOKLYN");

//BELOW IS WHAT TO SEND TO THE FETCH
var voting_markers = "[";
brooklyn_voting_sites.map(item => voting_markers+='\n'+ JSON.stringify({text: item[site_name_pos],lat: item[latitude_pos], lng: item[longitude_pos] }) +"," )
voting_markers += "{}]"

console.log(positions)
// console.log(voting_markers)

//now that we have the positions, we can use this to get the proper data from the JSON when needed

app.use(express.static(__dirname));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // Access-Control-Allow-Origin : http://localhost:5000
    // Access-Control-Allow-Credentials : true
    // Access-Control-Allow-Methods : GET, POST, OPTIONS
    // Access-Control-Allow-Headers : Origin, Content-Type, Accept
    next();
  });

app.get("/", function(req,res){
    res.sendFile('index.html', { root: __dirname });
})

app.get("/voting-stations", function(req, res){
  res.send(voting_markers);
})

app.get("/testing-sites", function(req, res){
  res.send(testing_sites);
})


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));




