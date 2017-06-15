/**
 * Use the Spotify Client Credentials oAuth2 flow to obtain an access token
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */

var request = require('request'); 
var http = require('http');

var client_id = ''; // Your client id
var client_secret = ''; // Your secret

var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

function getToken(){
  return new Promise((resolve, reject) => {
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        resolve(body.access_token);
      } else {
        reject();
      }
    });
  });
}

exports.handler = (event, context, callback) => {
  console.log('handler');
  getToken().then((token) => {
    tokenJson = '{\"token\": \"' + token + '\"}';
    console.log('token: ' + tokenJson);
    callback(null, {
    "statusCode": 200,
    "headers": {
        "X-Requested-With": "*",
        "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST,GET,OPTIONS"
    },
    "body": tokenJson
    });
  });
};

