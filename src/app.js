/**
 * my first pebble app
 */

var UI = require('ui');
var Settings = require('settings');
var ajax = require('ajax');
var Vibe = require('ui/vibe');
var apiKey = null;
var room = 'utility';
var device = 'laundrino';

var main = new UI.Card( {
  title: room + ' ' + device,
  body: 'Shake to view',
  scrollable: true
} );

var success = function ( data ) {
  if ( ! data ) return main.body( 'no data' );
  if ( ! data.result ) return main.body( 'no data.result, got ' + data );
  if ( ! data.result.data ) return main.body( 'no data.result.data' );
  Vibe.vibrate( 'short' );
  main.body( data.result.data.message || 'hmm no message');
};
var failure = function ( error ) {
  Vibe.vibrate( 'long' );
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
    url: 'http://ourduino.no-ip.org/room/' + room + '/' + device + '?key=' + apiKey,
    type: 'json'
  };
  ajax( options, success, failure );
};
var shake = function ( e ) {
  console.log( 'Shake detected.' );
  getData( );
};

var openConfig = function ( e ) {
  Settings.option( 'apiKey', apiKey );
  Settings.option( 'room', 'room' );
  Settings.option( 'device', device );
};
var closeConfig = function ( e ) {
  var options = JSON.parse( decodeURIComponent( e.response ));
  main.body( "closed,\n" + JSON.stringify( options ) + "\n" + JSON.stringify( e.response ) + "\n" + e.failed );
};
 
Settings.config( { url: 'http://www.clarkeology.com/project/pebble' }, openConfig, closeConfig );
main.on( 'accelTap', shake );
main.on( 'click', click );
main.show( );
getData( );
