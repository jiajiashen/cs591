const express = require('express');
const router = express.Router();

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/cs591')
const db = mongoose.connection
db.once('open', function () {
    console.log('Connection successful.')
})

const Schema = mongoose.Schema
const stringSchema = new Schema({
    name: String,
    length: Number
})

const str = mongoose.model('name', stringSchema)


// problem One:
// get method
router.get('/:nStr', function (req, res, next) {
    let paraName = req.params.nStr
    str.find({name: paraName}, function (err, result){
        if (result == null) {
            console.log("This is a new string:", paraName)
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
        else{
            console.log("String is Found")
            res.json(result)
        }
    })
});

// Problem Two:
// GET:
router.get('/', function (req, res, next) {
    str.find({}, function (err, results) {
        res.json(results);
    })
});


// Problem Three
//post method
router.post('/', function (req, res, next) {
    let key = req.body.name
    if (key){
        str.find({name: key}, function (err, result){
            if (result == null){
                console.log("This is a New String", key)
                const aStr = new str({
                    name: key,
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
            else{
                console.log("This String:", result[0].name, "is Found")
                res.json(result)
            }

        })
    }
    else{
        res.json({message: 'please provide a new string'})
    }
});


// Problem Four
//delete
router.delete('/:_nStr', function (req, res, next) {
    let paraName = req.params._nStr
    str.find({name: paraName}, function (err, result) {
        if (result == null){
            res.json({message: 'String is not Found here'});
        }
        else{
            str.findOneAndRemove({name: paraName}, function (err, result){
                res.json({message: 'String is deleted.'})
            })
        }
    })
});

module.exports = router;