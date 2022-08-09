// Calculate the fundamental frequency of a buffer
// by finding the peaks, and counting the distance
// between peaks in samples, and converting that
// number of samples to a frequency value.
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
module.exports = { findFrequency }
