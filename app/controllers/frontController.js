let Front = require('../models/front');
let _ = require('lodash');

exports.index = function(req, res) {
    Front.index()
    .then((coins) => {
        res.json({ data: coins });
    })
}

exports.list = function(req, res) {
    const perPage = 50;
    let page = req.query.page || 1
    let sort = {
        field: req.query.sort_by.split('.')[0],
        dir: req.query.sort_by.split('.')[1]
    };

    Front.list()
    .then((coins) => {
        let start = perPage * (page - 1);
        let end = perPage * page;
        let total = coins.length;

        let sortedCoins = _.orderBy(coins, [sort.field], [sort.dir]);
        let filteredCoins = sortedCoins.splice(start, end)

        res.json({
            data: filteredCoins,
            total: total,
            per_page: perPage
        });
    })
}

exports.coins = function(req, res) {
    Front.coins()
    .then((coins) => {
        res.json(coins);
    })
}