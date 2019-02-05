//main app runs restify web server - provides ability to create new player in existing game or create new player in new game
const Sequelize = require('sequelize');
var restify = require('restify');
var server = restify.createServer();
server.use(restify.plugins.queryParser());

server.listen(process.env.port || process.env.PORT || 3978, function () {
  console.log('%s listening to %s', server.name, server.url); 
});

server.get('/', function (req, res){
    console.log("Inbound Request:" , req.query);
    res.header('Access-Control-Allow-Origin', "*");
    var statusUpdateResponse = processPlayerTrackingUpdate(res,req.query);
    console.log('Outbound Response:', req.query.event + ":" + statusUpdateResponse);
  });

const GameTrackingTable = require("./gameTrackingTableModel");

// load local model from database
// force: true will drop the table if it already exists
GameTrackingTable.sync({force:false}).then(() => {
    console.log('Database is online');
      });

// //loads all rows 
// GameTrackingTable.findAll().then(playerGameTrackingRow=> {
// console.log(playerGameTrackingRow)
// })


function processPlayerTrackingUpdate(res, query) //query.event defines what to do, query.gameId or query.playerId defines which rows to update
{
  //API call ?playerGameId=X&gameId=Y&event=Z
  //decide what to do 
  switch (query.event) {
    case 'createNewPlayerInGame' : {
      GameTrackingTable.create({
        gameId: query.gameId,
        gameStartTime: query.gameStartTime,
        gameLocation: query.gameLocation,
        gameField: query.gameField
        }).then(gameTrackingRow => {
        res.send('New Player added to Game '+ gameTrackingRow.gameId + ' with playerGameId '+ gameTrackingRow.playerGameId);
        console.log('New Player added to Game '+ gameTrackingRow.gameId + ' with playerGameId '+ gameTrackingRow.playerGameId);
        })
        return;
    }
    //TO DO: add logic to check if want to use existing gameId
  }
  return ('Update Failed')
}