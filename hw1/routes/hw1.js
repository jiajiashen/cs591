const express = require('express');
const router = express.Router();

/* GET home page. */
//router.get('/', function(req, res, next) {
//    res.render('index', { title: 'Express' });
//});


//test
router.get('/',function(req, res, next){
    res.send('test')
})


//get method
router.get('/:name', function (req, res, next) {
    let paraName = req.params.name
    res.json({string: paraName, length: paraName.length})
});


//post method
router.post('/', function (req, res, next) {
    let val = req.body.keys
    res.json({string: val, length: val.length})
});

module.exports = router;