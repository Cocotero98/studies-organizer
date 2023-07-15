const Study = require('../models/study');
const sequenceGenerator = require('./sequenceGenerator')

var express = require('express');
var router = express.Router();
module.exports = router; 

router.get('/', (req, res, next) => {
    Study.find()
    .then(result => {
        return res.status(200).json(result)
    })
    .catch(err=>{
        console.log('error: '+err)
        return res.status(500).json({
            title: "An error occurred",
            error: err
        })
    })
})

router.get('/last', (req, res, next) => {
    const maxStudyId = sequenceGenerator.nextId('study');
    let maxIdInt = parseInt(maxStudyId) -1;
    let maxIdStr = maxIdInt.toString()
    Study.findOne({ id: maxIdStr })
    .then(result => {
        return res.status(200).json(result)
    })
    .catch(err=>{
        console.log('error: '+err)
        return res.status(500).json({
            title: "An error occurred",
            error: err
        })
    })
})

router.post('/', (req, res, next) => {
    const maxStudyId = sequenceGenerator.nextId('study');

    const study = new Study({
      id: maxStudyId,
      name: req.body.name,
      time: req.body.time
    });
  
    study.save()
      .then(createdStudy => {
        res.status(201).json({
          id: maxStudyId,
          message: 'study added successfully',
          study: createdStudy
        });
      })
      .catch(error => {
         res.status(500).json({
            message: 'An error occurred',
            error: error
          });
      });
  });

router.delete("", (req, res, next) => {
    study.findOne({ name: req.body.name })
    .then((study)=>{
        study.deleteOne({ id: req.body.name })
        .then(result => {
            res.status(204).json({
                message: "Study deleted successfully"
              });
        })
        .catch(error => {
            res.status(500).json({
            message: 'An error occurred',
            error: error
          });
         })
    })
    .catch(error => {
        res.status(500).json({
          message: 'Contact not found.',
          error: { contact: 'Contact not found'}
        });
      });
})