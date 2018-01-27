let Front = require('../models/front');

exports.index = function(req, res) {
    Front.index()
    .then((coins) => {
        res.json({ data: coins });
    })
}