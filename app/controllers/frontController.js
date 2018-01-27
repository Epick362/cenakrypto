let Front = require('../models/front');

exports.index = function(req, res) {
    Front.index()
    .then((response) => {
        res.json({ data: response.data });
    })
}