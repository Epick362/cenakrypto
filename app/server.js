const express = require('express')
const app = express()
const bodyParser = require('body-parser')

let frontController = require('./controllers/frontController')
let coinController = require('./controllers/coinController')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const port = process.env.PORT || 3100;

// ROUTES FOR OUR API
// =============================================================================
const router = express.Router();

router.get('/front', frontController.index);
router.get('/list', frontController.list);
router.get('/coins', frontController.coins);
router.get('/coin/:coin', coinController.show);
router.get('/coin/:coin/history/:range', coinController.history);

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);