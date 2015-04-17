$(function() {
  'use strict';

  var mySound, myOscillator, myGain, myDistortion, originalYPos, originalFrequency,
      scaleFrequencies = [110, 123.47, 130.81, 146.83, 164.81, 174.61, 196, 220, 246.94, 261.63, 293.66, 329.63, 349.23, 392, 440, 493.88, 523.25, 587.33, 659.25, 698.46, 783.99, 880, 987.77, 1046.50, 1174.66, 1318.51, 1396.91, 1567.98, 1760],
      appNode = document.querySelector('.app'),
      appWidth = appNode.offsetWidth,
      appHeight = appNode.offsetHeight,
      mouseXpos = window.clientX,
      mouseYpos = window.clientY;

      appNode.style.background = 'repeating-linear-gradient(to right, #FDF6E4, #FDF6E4 50%, #F7EFD7 50%, #F7EFD7)';
      appNode.style.backgroundSize = ((appWidth / scaleFrequencies.length)*2) + 'px 100%';


      var contextClass = (window.AudioContext  || window.webkitAudioContext);


      function makeDistortionCurve(amount) {
        var k = typeof amount === 'number' ? amount : 50,
          n_samples = 44100,
          curve = new Float32Array(n_samples),
          deg = Math.PI / 180,
          i = 0,
          x;
        for ( ; i < n_samples; ++i ) {
          x = i * 2 / n_samples - 1;
          curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
        }
        return curve;
      }


      if (contextClass) {
        mySound = new contextClass();
      } else {
        document.querySelector('.app').innerHTML = '<div class="container alert alert-danger" role="alert">Sorry, this app requires the Web Audio API, which your browser does not support.</div>';
      }

      appNode.addEventListener('mousedown', function(e) {

        mouseXpos = e.clientX;
        mouseYpos = e.clientY;
        originalYPos = mouseYpos;

        myOscillator = mySound.createOscillator();
        myOscillator.type = 'sine'; // sine square sawtooth triangle

        originalFrequency = scaleFrequencies[Math.floor((mouseXpos/appWidth) * scaleFrequencies.length)];

        myOscillator.frequency.value = originalFrequency;
        myOscillator.start();

        myDistortion = mySound.createWaveShaper();
        myDistortion.curve = makeDistortionCurve(400);
        myDistortion.oversample = '4x';


        myGain = mySound.createGain();
        myGain.gain.value = 1;

        myOscillator.connect(myDistortion);
        myDistortion.connect(myGain);
        myGain.connect(mySound.destination);

        appNode.addEventListener('mousemove', function(e) {
          var distanceY = e.clientY - originalYPos;
          mouseXpos = e.clientX;
          appWidth = appNode.offsetWidth;

          myGain.gain.value = mouseXpos/appWidth;
          myOscillator.frequency.value = originalFrequency + distanceY;

          appNode.style.backgroundSize = ((appWidth / scaleFrequencies.length)*2) + 'px 100%';

        }, false); //mousemove

      }, false); //mousedown

      appNode.addEventListener('mouseup', function() {
        myOscillator.stop();
        appNode.removeEventListener('mousemove');
      }, false); //mouseup

}); // page loaded
