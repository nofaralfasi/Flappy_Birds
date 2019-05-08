var util = require('util'),
    EventEmitter = require('events').EventEmitter,
    Scores = require('./scoresManager'),
    Player = require('./player'),
    enums = require('./enums');

var NB_AVAILABLE_BIRDS_COLOR = 10;

var _playersList = [],
    _posOnGrid = 0,
    _scores = new Scores();

function PlayersServerSideManager() {
    EventEmitter.call(this);
}

util.inherits(PlayersServerSideManager, EventEmitter);

PlayersServerSideManager.prototype.addNewPlayer = function (playerSocket, id) {
    var newPlayer,
        playersListLength,
        birdColor;

    // Checks how many players are currently playing the game
    playersListLength = _playersList.length;

    // Set an available color according the number of client's sprites
    if (playersListLength >= NB_AVAILABLE_BIRDS_COLOR) {
        birdColor = Math.floor(Math.random() * ((NB_AVAILABLE_BIRDS_COLOR - 1) + 1));
    } else {
        birdColor = playersListLength;
    }


    // Create new player and add it in the list
    newPlayer = new Player(playerSocket, id, birdColor);
    _playersList.push(newPlayer);
    console.info('New player connected. There is/are currently ' + _playersList.length + ' player/s');
    return (newPlayer);
};

PlayersServerSideManager.prototype.removePlayer = function (player) {
    var pos = _playersList.indexOf(player);

    if (pos < 0) {
        console.error("[ERROR] Can't find player in playerList");
    } else {
        console.info('Removing player ' + player.getNick());
        _playersList.splice(pos, 1);
        console.info('It remains ' + _playersList.length + ' player/s');
    }
};

PlayersServerSideManager.prototype.changeLobbyState = function (player, isReady) {
    var pos = _playersList.indexOf(player),
        nbPlayers = _playersList.length,
        i;

    if (pos < 0) {
        console.error("[ERROR] Can't find player in playerList");
    } else {
        // Change ready state
        _playersList[pos].setReadyState(isReady);
    }

    // PlayersServerSideManager check if players are ready
    for (i = 0; i < nbPlayers; i++) {
        // if at least one player doesn't ready, return
        if (_playersList[i].getState() === enums.PlayerState.WaitingInLobby) {
            console.info(_playersList[i].getNick() + "'s wings are not yet ready to fly, please don't start game!");
            return;
        }
    }
    // else raise the start game event !
    this.emit('players-ready');
};

PlayersServerSideManager.prototype.getPlayerList = function (specificState) {
    var players = [],
        nbPlayers = _playersList.length,
        i;

    for (i = 0; i < nbPlayers; i++) {
        if (specificState) {
            if (_playersList[i].getState() === specificState)
                players.push(_playersList[i]);
        } else
            players.push(_playersList[i].getPlayerObject());
    }
    return (players);
};

PlayersServerSideManager.prototype.getOnGamePlayerList = function () {
    var players = [],
        nbPlayers = _playersList.length,
        i;

    for (i = 0; i < nbPlayers; i++) {
        if ((_playersList[i].getState() === enums.PlayerState.Playing) || (_playersList[i].getState() === enums.PlayerState.Died))
            players.push(_playersList[i].getPlayerObject());
    }
    return (players);
};

PlayersServerSideManager.prototype.getNumberOfPlayers = function () {
    return (_playersList.length);
};

PlayersServerSideManager.prototype.updatePlayers = function (time) {
    var nbPlayers = _playersList.length,
        i;

    for (i = 0; i < nbPlayers; i++) {
        _playersList[i].update(time);
    }
};

PlayersServerSideManager.prototype.arePlayersStillAlive = function () {
    var nbPlayers = _playersList.length,
        i;

    for (i = 0; i < nbPlayers; i++) {
        if (_playersList[i].getState() === enums.PlayerState.Playing)
            return (true);
    }
    return (false);
};

PlayersServerSideManager.prototype.resetPlayersForNewGame = function () {
    var nbPlayers = _playersList.length,
        i,
        updatedList = [];

    // reset position counter
    _posOnGrid = 0;

    for (i = 0; i < nbPlayers; i++) {
        _playersList[i].preparePlayer(_posOnGrid++);
        updatedList.push(_playersList[i].getPlayerObject());
    }
    return (updatedList);
};

PlayersServerSideManager.prototype.sendPlayerScore = function () {
    var nbPlayers = _playersList.length,
        i;

    // Save player score
    for (i = 0; i < nbPlayers; i++) {
        _scores.savePlayerScore(_playersList[i], _playersList[i].getScore());
    }
    // Retrieve highscores and then send scores to players
    _scores.getHighScores(function (highScores) {
        var nbPlayers = _playersList.length,
            i;

        // Send score to the players
        for (i = 0; i < nbPlayers; i++) {
            _playersList[i].sendScore(nbPlayers, highScores);
        }
    });

};

PlayersServerSideManager.prototype.prepareNewPlayer = function (player, nickname) {
    // Set his nickname
    player.setNick(nickname);

    // retrieve his highscore
    _scores.setPlayerHighScore(player);

    // Put him on the game grid
    player.preparePlayer(_posOnGrid++);
};


module.exports = PlayersServerSideManager;
