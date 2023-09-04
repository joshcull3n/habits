import App from '../App.js'

function DetectDevice() {
  var agnt = window.navigator.userAgent.toLowerCase()
  var isIpad = /Macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints && navigator.maxTouchPoints > 1;
  var mobile = false;
  if (agnt.includes('ipad') || agnt.includes('iphone') || agnt.includes('android') || agnt.includes('blackberry') || agnt.includes('webOS') || isIpad)
    mobile = true

  return mobile
}

