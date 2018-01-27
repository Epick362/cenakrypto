let Coin = require('../models/coin');

exports.show = function(req, res) {
    Coin.show(req.params.coin)
    .then((coin) => {
        res.json(coin);
    })
}

exports.history = function(req, res) {
    Coin.history(req.params.coin, req.params.range)
    .then((history) => {
        res.json(history);
    })
}