let Front = require('../models/front');

exports.index = function(req, res) {
    Front.index()
    .then((coins) => {
        res.json({ data: coins });
    })
}

exports.coins = function(req, res) {
    Front.coins()
    .then((coins) => {
        res.json({ data: coins });
    })
}