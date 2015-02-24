/**
 * my first pebble app
 */

var UI = require('ui');
var Settings = require('settings');
var ajax = require('ajax');
var Vibe = require('ui/vibe');
var apiKey = 'hWAb9ldyzupRqCAKIqsrsQ==';

var main = new UI.Card( {
  title: 'Laundrino',
  body: 'Shake to view',
  scrollable: true
} );

var success = function ( data ) {
  if ( ! data ) return main.body( 'no data' );
  if ( ! data.result ) return main.body( 'no data.result, got ' + data );
  if ( ! data.result.data ) return main.body( 'no data.result.data' );
  Vibe.vibrate('short');
  main.body( data.result.data.message || 'hmm no message');
};
var failure = function ( error ) {
  Vibe.vibrate('long');
  var msg = [ 'hmm data error' ];
  for ( var key in error ) {
    msg.push( key + ' ' + error[ key ] );
  }
  main.body( msg.join( "\n" ));
};
var click = function ( e ) {
  main.subtitle( 'Button ' + e.button + ' pressed.' );
};
var getData = function ( ) {
  main.body( 'Loading...' );
  var options = {
    url: 'http://ourduino.no-ip.org/room/utility/laundrino?key=' + apiKey,
    type: 'json'
  };
  ajax( options, success, failure );
};
var shake = function ( e ) {
  console.log( 'Shake detected.' );
  getData( );
};

main.on( 'accelTap', shake );
main.on( 'click', click );
var closeConfig = function ( e ) {
  console.log('closed configurable');
  main.body( 'closed, ' + JSON.stringify( e.options ));
  // Show the raw response if parsing failed
  if (e.failed) {
    console.log(e.response);
  }
};
 
Settings.config( { url: 'http://www.clarkeology.com/project/pebble?apiKey=' + apiKey }, closeConfig );
main.show( );
getData( );