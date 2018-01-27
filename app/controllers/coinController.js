let Coin = require('../models/coin');

exports.show = function(req, res) {
    Coin.show(req.params.coin)
    .then((response) => {
        res.json({ response });
    })
}

exports.history = function(req, res) {
    Coin.history(req.params.coin, req.params.range)
    .then((response) => {
        res.json({ response });
    })
}