var Sequence = require('../models/sequence');

var express = require('express');
var router = express.Router();
module.exports = router; 

var maxStudyId;
var sequenceId = null;

function SequenceGenerator() {

  Sequence.findOne()
      .then((sequence) => { 
      sequenceId = sequence._id;
      maxStudyId = sequence.maxStudyId;
    })
    .catch((err)=>{
      return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
    });      
    };

getId = function(){
  return maxStudyId;
}

SequenceGenerator.prototype.nextId = function(collectionType) {

  var updateObject = {};
  var nextId;

  switch (collectionType) {
    case 'study':
      maxStudyId++;
      updateObject = {maxStudyId: maxStudyId};
      nextId = maxStudyId;
      break;
    default:
      return -1;
  }

  Sequence.updateOne({_id: sequenceId}, {$set: updateObject})
  .then((result) => {
        console.log("success sequence");
        return null
    })
    .catch((err)=>{
      console.log("nextId error = " + JSON.stringify(err));
        return null
    })
    

  return nextId;
}

// router.get('/', (req, res, next) => {
//   Sequence.find()
//   .then(result => {
//       return res.status(200).json(result)
//   })
//   .catch(err=>{
//       console.log('error: '+err)
//       return res.status(500).json({
//           title: "An error occurred",
//           error: err
//       })
//   })
// })

module.exports = new SequenceGenerator();
