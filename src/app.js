var UI = require('ui');
// var Settings = require('settings');
// var ajax = require('ajax');
// var Vibe = require('ui/vibe');
var room = 'utility';
var device = 'laundrino';
// var robotButler = 'http://ourduino.no-ip.org:8000';

var main = new UI.Card({
  title: room + ' ' + device,
  body: 'Shake to view',
  scrollable: true
});

/* var success = function (data) {
  if (!data) return main.body('no data');
  if (!data.result) return main.body('no data.result, got ' + data);
  if (!data.result.data) return main.body('no data.result.data');
  Vibe.vibrate('short');
  return main.body(data.result.data.message || 'hmm no message');
};

var failure = function (error) {
  Vibe.vibrate('long');
  var msg = [ 'hmm data error' ];
  for (var key in error) {
    msg.push(key + ' ' + error[ key ]);
  }
  main.body(msg.join('\n'));
};

var click = function (e) {
  main.subtitle('Button ' + e.button + ' pressed.');
};
var getData = function () {
  main.body('Loading...');
  var options = {
    url: robotButler + '/room/' + room + '/' + device + '?key=' + Settings.option('apiKey'),
    type: 'json'
  };
  ajax(options, success, failure);
};

var openConfig = function () {
};

var closeConfig = function (e) {
  if (e.failed) {
    console.log('config failed', e);
    return false;
  }
  if (!e.options) {
    console.log('config got no response', e);
    return false;
  }
  var options = { };
  try {
    options = JSON.parse(decodeURIComponent(e.options));
  } catch (err) {
    console.log('decoding options failed', err);
  }
  if (!options.apiKey) {
    try {
      options = JSON.parse(decodeURIComponent(e.response));
    } catch (err) {
      console.log('decoding response failed', err);
    }
  }
  if (!options.apiKey) {
    console.log('decoding options failed', e);
    return false;
  }
  Settings.option(options);
  main.body('ok, key now ' + options.apiKey + ' e: ' + JSON.stringify(e.options || e.response));
  return true;
};

Settings.config({ url: 'http://www.clarkeology.com/project/pebble?apiKey=' + Settings.option('apiKey') }, openConfig, closeConfig);
main.on('accelTap', getData);
main.on('click', click);
getData(); */

main.show();
