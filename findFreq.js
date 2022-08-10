// Calculate the fundamental frequency of a buffer
// by finding the peaks, and counting the distance
// between peaks in samples, and converting that
// number of samples to a frequency value.
var autocorrelation = require('autocorrelation').autocorrelation;

function findFrequency(autocorr, sampleRate) {

  var nSamples = autocorr.length;
  var valOfLargestPeakSoFar = 0;
  var indexOfLargestPeakSoFar = -1;

  for (var index = 1; index < nSamples; index++){
    if(index >= 3 && index <= 100){
      var valL = autocorr[index-1];
      var valC = autocorr[index];
      var valR = autocorr[index+1];

      var bIsPeak = ((valL < valC) && (valR < valC));
      if (bIsPeak){
        if (valC > valOfLargestPeakSoFar){
          valOfLargestPeakSoFar = valC;
          indexOfLargestPeakSoFar = index;
        }
      }
    }

  }
  
  var distanceToNextLargestPeak = indexOfLargestPeakSoFar - 0;

  // convert sample count to frequency
  var fundamentalFrequency = sampleRate / distanceToNextLargestPeak;
  return fundamentalFrequency;
}


//Autocor and half-wave rectification
function half_waving(signal, sr, max_lag = 3){
  var max_lag = sr*max_lag
  var autocor = autocorrelation(signal).slice(0, max_lag);
  var autocor = autocor.map(i=> Math.max(i, 0))
  return(autocor)   
}

//Time scaling and subtraction
function scaling(x, factor = 2){
  var time = [...Array(x.length).keys()];
  var time_scale = time.map(i=> Number(i)*2)
  var scaled = time_scale.map(i => x[i])
  var scaled = scaled.map(i => i === undefined ? 0 : i)
  var x = x.map(function(item, index) {
    return item - scaled[index];
  })
  return(x) 
}

//Wrapper
function enhancedAutocor(signal, sr, max_lag){
  autocor = half_waving(signal, sr, max_lag)
  autocor = scaling(autocor)
  return(autocor)
}

function beat_to_sample(beat, sr){
  var r = (60*sr)/beat
  return(r)
}

const findPeaks = (arr = []) => {
   let positions = []
   let maximas = []
   for (let i = 1; i < arr.length - 1; i++) {
      if (arr[i] > arr[i - 1]) {
         if (arr[i] > arr[i + 1]) {
            positions.push(i)
            maximas.push(arr[i])
         } else if (arr[i] === arr[i + 1]) {
            let temp = i
            while (arr[i] === arr[temp]) i++
            if (arr[temp] > arr[i]) {
               positions.push(temp)
               maximas.push(arr[temp])
            }
         }
      }
   }
   return [maximas, positions];
};

function period(autocor_result, sr){
    var [periods, positions] = findPeaks(autocor_result)
    var bpmLow = beat_to_sample(10, sr)
    var bpmHigh = beat_to_sample(300, sr) 
    var viable_periods = []
    for (let i = 0; i < periods.length; i++) {
      if(positions[i] < bpmLow && positions[i] > bpmHigh){
        viable_periods.push(positions[i])
      }
    }
  return(viable_periods) //how many samples for a given period
}

//Function returns periods found within signal
function doit(signal, sr, max_lag){
  var autocor = enhancedAutocor(signal, sr, max_lag)
  var periods = period(autocor, sr)
  var finalPeriods = []
  for(k in periods){
    finalPeriods.push(periods[k]/sr)
  }
  return(finalPeriods) //Returns how long, in seconds, one period takes.
}

module.exports = { doit }

