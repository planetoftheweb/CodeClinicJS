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





}); // page loaded
