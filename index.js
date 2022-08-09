const express = require('express');
const app = express();
var util = require('util');
var autocorrelation = require('autocorrelation').autocorrelation;
const { findFrequency } = require("./findFreq.js")

// Server setup
app.listen(3000 , () => {console.log("Listening at 3000...")});
app.use(express.static('public'))
app.use(express.json({limit: '1mb'}));

app.post('/bet' , async (req,res)=>{
  console.log("Received accel")
  var signal = req.body.accel
  console.log(signal)
  var acf = autocorrelation(signal);
  console.log(acf)
  var freq = findFrequency(acf, 16)
  var frequencyObject = JSON.stringify({frequency: freq})
  res.send(frequencyObject)
})
