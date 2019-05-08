var Const = require('../shared/constants').constant;

/*
 * GET home page.
 */

exports.index = function (req, res) {
    res.render('index', {title: 'Express'});
};

exports.flappybirds = function (req, res) {
    res.render('flappybirds', {title: 'FlappyBirds.js', wsAddress: Const.SOCKET_ADDR + ':' + Const.SOCKET_PORT});
};