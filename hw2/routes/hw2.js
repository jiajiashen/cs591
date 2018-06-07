const express = require('express');
const router = express.Router();

const mongoose = require ('mongoose')
mongoose.connect('mongodb://localhost/cs591')
const db = mongoose.connection;
db.once('open', function(){
    console.log('Connection successful.')
});

const Schema = mongoose.Schema
const stringSchema = new Schema({
    name: String,
    length: Number
})

const str = mongoose.model('name', stringSchema)


// GET: When passing a string on the query (i.e. http://localhost:3000/hw2/
// longstring), first look in the database to see if the string is already present.
// If it is, return the string and its length as read from the database.
// If it isn’t, compute the length, store the string and its length in the database, and return both to the client.

router.get('/:nString', function (req, res, next){
    let paraName = req.params.nString
    str.find({name: paraName}, function (err, results) {
        if (results == null) {
            const aStr = new str({
                name: paraName,
                length: name.length
            });
            aStr.save(function(err){
                if (err){
                    res.send(err)
                }
                else{
                    res.json(aStr)
                }
                })
            }
        else {
            console.log("String is Found")
            res.json({name: results[0].name, length: results[0].length})
        }
    })
    });



// get
router.get('/', function (req, res, next) {
    str.find({}, function (err, results) {
        res.json(results)
    })
});


//POST: Similar to the GET, when passed a string, first look in the database to see if the string is already present.
// If it is, return the string and its length as read from the database.
// If it isn’t, compute the length, store the string and its length in the database, and return both to the client.
// If no string is passed, return a message in JSON format prompting the user to provide a string.

router.post('/',function(req, res, next){
    let paraName = req.body.name
    if (paraName) {
        str.find({name: paraName}, function (err, results) {
            if (results == null) {
                console.log("this is a new string: ", paraName)
                const aStr = new str({
                    name: paraName,
                    length: name.length
                });
                aStr.save(function (err) {
                    if (err) {
                        res.send(err)
                    }
                    else {
                        res.json(aStr)
                    }
                })
            }
            else {
                console.log("This string: ", results[0].name, "is found");
                res.json({name: results[0].name, length: results[0].length})
            }
        })
    }
    else{
        res.json({message: 'please provide a string'});
    }
    });


// DELETE: This route takes a string, and if the string is present in the database,
// it deletes the document and returns a message in JSON format indicating success.
// If the string is not present, return a ‘string not found’ message in JSON format.
router.delete('/:_nString', function (req, res, next) {
    let paraName = req.params._nString
    str.findOneAndRemove({string: paraName}, function (err, results) {
        if(err) {
            res.json({message: 'String is not found'});
        }
        else {
            res.json({message: 'String is deleted.'});
        }
    })
});



module.exports = router;