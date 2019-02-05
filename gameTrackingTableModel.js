//Initialize connection to SQL and define sequelize model 

const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.sqldatabase, process.env.sqlusername, process.env.sqlpassword, {
    host: process.env.sqlserver,
    dialect: 'mssql',
    dialectOptions: {encrypt: true},
    operatorsAliases: false
  });

  sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


//   const GameTrackingTable = sequelize.define('testGameTrackingTable')

const GameTrackingTable = sequelize.define('testGameTrackingTable', {
  //a row is assigned to each player in each game with a unique playerGameId
  //a game can have multiple players & therefore multiple rows all sharing the same gameId
  playerGameId: {type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey:true}, //a unique ID is assigned to each player for each game

  //game specific data
  gameId: {type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4}, //a unique ID is assigned for each game which is shared by all players in that game
  gameField: {type: Sequelize.CHAR(255), defaultValue: "Game Field"},
  gameFinalWhistleCount: {type: Sequelize.SMALLINT, defaultValue: 0},
  gameKickOffCount: {type: Sequelize.SMALLINT, defaultValue: 0},
  gameLocation: {type: Sequelize.CHAR(255), defaultValue: "Game Location"},
  gameMatchState: {type: Sequelize.CHAR(50), defaultValue: "Pre-Game"},
  gameMostRecentStartTime: {type: Sequelize.BIGINT, defaultValue: 0},
  gameTotalElapsedTime: {type: Sequelize.BIGINT, defaultValue: 0},
  gameStartTime: {type: Sequelize.DATE},

  //away team data
  gameAwayClub: {type: Sequelize.CHAR(255), defaultValue: "Away Club Name"},
  gameAwayTeam: {type: Sequelize.CHAR(255), defaultValue: "Away Team Name"},
  gameAwayTeamDirectKicks: {type: Sequelize.SMALLINT, defaultValue: 0},
  gameAwayTeamGKSaves: {type: Sequelize.SMALLINT, defaultValue: 0},
  gameAwayTeamGoalCount: {type: Sequelize.SMALLINT, defaultValue: 0},
  gameAwayTeamIndirectKicks: {type: Sequelize.SMALLINT, defaultValue: 0},
  gameAwayTeamShotsOnGoal: {type: Sequelize.SMALLINT, defaultValue: 0},

  //home team data
  gameHomeClub: {type: Sequelize.CHAR(255), defaultValue: "Home Club Name"},
  gameHomeTeam: {type: Sequelize.CHAR(255), defaultValue: "Home Team Name"},
  gameHomeTeamDirectKicks: {type: Sequelize.SMALLINT, defaultValue: 0},
  gameHomeTeamGKSaves: {type: Sequelize.SMALLINT, defaultValue: 0},
  gameHomeTeamGoalCount: {type: Sequelize.SMALLINT, defaultValue: 0},
  gameHomeTeamIndirectKicks: {type: Sequelize.SMALLINT, defaultValue: 0},
  gameHomeTeamShotsOnGoal: {type: Sequelize.SMALLINT, defaultValue: 0},

  //player specific data
  playerAssistCount: {type: Sequelize.SMALLINT, defaultValue: 0},
  playerCardRed: {type: Sequelize.SMALLINT, defaultValue: 0},
  playerCardYellow: {type: Sequelize.SMALLINT, defaultValue: 0},
  playerCornerCount: {type: Sequelize.SMALLINT, defaultValue: 0},
  playerDribbleAttemptedCount: {type: Sequelize.SMALLINT, defaultValue: 0},
  playerDribbleSuccessfulCount: {type: Sequelize.SMALLINT, defaultValue: 0},
  playerFoulCommittedCount: {type: Sequelize.SMALLINT, defaultValue: 0},
  playerFouledCount: {type: Sequelize.SMALLINT, defaultValue: 0},
  playerFreeKickCount: {type: Sequelize.SMALLINT, defaultValue: 0},
  playerInOut: {type: Sequelize.CHAR(50), defaultValue: "In"},
  playerInSpaceCount: {type: Sequelize.SMALLINT, defaultValue: 0},
  playerMostRecentStartTime: {type: Sequelize.BIGINT, defaultValue: 0},
  playerName: {type: Sequelize.CHAR(255), defaultValue: "Player Name"},
  playerNumber: {type: Sequelize.SMALLINT, defaultValue: 0},
  playerOffside: {type: Sequelize.SMALLINT, defaultValue: 0},
  playerPassAttemptedCount: {type: Sequelize.SMALLINT, defaultValue: 0},
  playerPassCompletedCount: {type: Sequelize.SMALLINT, defaultValue: 0},
  playerPenaltyKickCount: {type: Sequelize.SMALLINT, defaultValue: 0},
  playerScanningCount: {type: Sequelize.SMALLINT, defaultValue: 0},
  playerShotCount: {type: Sequelize.SMALLINT, defaultValue: 0},
  playerShotOffFrameCount: {type: Sequelize.SMALLINT, defaultValue: 0},
  playerShotOnFrameCount: {type: Sequelize.SMALLINT, defaultValue: 0},
  playerSubstitutedInCount: {type: Sequelize.SMALLINT, defaultValue: 0},
  playerSubstitutedOutCount: {type: Sequelize.SMALLINT, defaultValue: 0},
  playerTackleAttemptedCount: {type: Sequelize.SMALLINT, defaultValue: 0},
  playerTackleSuccessfulCount: {type: Sequelize.SMALLINT, defaultValue: 0},
  playerTeamAwayHome: {type: Sequelize.CHAR(50), defaultValue: "Player Team"}, //name of Team
  playerTotalElapsedTime: {type: Sequelize.BIGINT, defaultValue: 0},
  userName: {type: Sequelize.CHAR(50)} //username of person updating data




  });

  module.exports = GameTrackingTable;