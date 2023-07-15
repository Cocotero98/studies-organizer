const Day = require('../models/day');

var express = require('express');
var router = express.Router();
module.exports = router; 

router.get('/', (req, res, next) => {
    Day.find()
    .populate('studies')
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

// router.post('', (req, res, next) => {
//     const day = new Day({
//         name: req.body.name,
//         studies: req.body.studies
//     })

//     day.save()
//     .then(dayAdded => {
//         res.status(201).json({
//             message: 'Day added successfully',
//             day: dayAdded
//         })
//     })
//     .catch(err => {
//         res.status(500).json({
//             message: 'An error occurred',
//             error: err
//           });
//     })
// })

router.put("", (req, res, next) => {
    Day.findOne({ name: req.body.name })
    .then(day => {
        console.log('here')
        console.log(req.body.studies)
        console.log(req.body.name)
        day.name = req.body.name;
        day.studies = req.body.studies;
        console.log(day.studies)

        Day.updateOne({ name: req.body.name }, day)
        .then(result => {
            console.log(result)
            res.status(204).json({
                message: 'Day updated successfully'
            })
        })
        .catch(err=> {
            res.status(500).json({
                message: 'An error occurred',
                error: err
            })
        })
    })
    .catch(err => {
        res.status(500).json({
            message: 'Day not found.',
            error: { day: 'Day not found'}
          });
    })
})

router.delete("", (req, res, next) => {
    Day.findOne({ name: req.body.name })
    .then((day)=>{
        Day.deleteOne({ id: req.body.name })
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