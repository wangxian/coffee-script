(function() {
  var CoffeeScript, grind, grindRemote, processScripts;
  if (typeof window !== "undefined" && window !== null) {
    CoffeeScript = require('./coffee-script');
    grind = function(coffee) {
      return setTimeout(CoffeeScript.compile(coffee));
    };
    grindRemote = function(url) {
      var xhr;
      xhr = new (window.ActiveXObject || XMLHttpRequest)('Microsoft.XMLHTTP');
      xhr.open('GET', url, true);
      if ('overrideMimeType' in xhr) {
        xhr.overrideMimeType('text/plain');
      }
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          return grind(xhr.responseText);
        }
      };
      return xhr.send(null);
    };
    processScripts = function() {
      var _i, _len, _ref, script;
      _ref = document.getElementsByTagName('script');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        script = _ref[_i];
        if (script.type === 'text/coffeescript') {
          if (script.src) {
            grindRemote(script.src);
          } else {
            grind(script.innerHTML);
          }
        }
      }
      return null;
    };
    if (window.addEventListener) {
      addEventListener('DOMContentLoaded', processScripts, false);
    } else {
      attachEvent('onload', processScripts);
    }
  }
}).call(this);