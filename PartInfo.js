var request = require("request");
var cheerio = require("cheerio");

module.exports = function(fullPartNumber, cb){
    var partNumber = fullPartNumber;

    var fullURL = "http://octopart.com/api/v3/parts/match?queries=[{\"mpn\":\"" + partNumber + "\"}]&apikey=283282c4&include[]=descriptions";

    request.get({url: fullURL, json: true, headers: {'User-Agent': 'request'}}, function(err, res, body) {
        if (err){
            console.log("Error with " + fullurl);
        } else {
            var man = body.results[0].items[0].manufacturer.name;
            var des = body.results[0].items[0].descriptions[0].value;
            var obj = {
                partNumber: partNumber,
                manufacturer: man,
                description: des
            };

            cb(obj)
        }
    });

};
