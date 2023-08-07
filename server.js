var express = require('express');
var multer  = require('multer');
var fetch  = require('cross-fetch');
// import fetch from 'node-fetch';
// import fetch from 'cross-fetch';
const cors = require('cors');

var app = express();
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    origin: '*'
}));
global.encodedKey ="ZWE5YzhlZTYtMWY5Mi00NTQ5LWEzNGQtOGU1NDUzOGRlNjRhOmIxZTNiZThhLTdjYWMtNGM3Yi1hYTJjLWMyNTVlYTkzOTRiMw=="
global.clientUrl ="http://localhost:4200"
let apikey = "ea9c8ee6-1f92-4549-a34d-8e54538de64a"
 
connectionString = "https://account-d.docusign.com/oauth/auth?response_type=code&scope=signature&client_id="+apikey+"&redirect_uri=http://localhost:3000"

app.set('view engine', 'ejs');

app.get('/', (req, res) => {

  var request = require('request');
  // let params = req.params
  let query = req.query
  // console.log(global.global.encodedKey)
  query.encodedKey = global.global.encodedKey
  
  // console.log(query.code)
  var options = {
    'method': 'POST',
    'url': 'https://account-d.docusign.com/oauth/token',
    'headers': {
      'Authorization': 'Basic ' + query.encodedKey,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: {
      'code': query.code,
      'grant_type': 'authorization_code'
    }
  };
  request(options, function (error, response) {
    console.log(response)
    let resp = response.toJSON()
    let respBody = JSON.parse(response.body)
    console.log(respBody)
    let token = respBody.access_token
    res.redirect(global.global.clientUrl + '?token='+ token)
    if (error) throw new Error(error);
  //   console.log(response.body);
  });
  
});
app.get('/user_info', (req, res) => {

  var request = require('request');
  let query = req.query
  var options = {
    'method': 'GET',
    'url': 'https://account-d.docusign.com/oauth/userinfo',
    'headers': {
      'Authorization': 'Bearer ' + query.token
    }
  };
  request(options, function (error, response) {
      res.json(response)
      if (error) throw new Error(error);
    console.log(response.body);
  });  
        
});
app.post('/upload', function (req, res, next) {
    // upload(req, res, function (err) {
    //     if (err) {
    //         return res.end("Something went wrong:(");
    //     }
    //     res.end("Upload completed.");
    // });
})

app.listen(3000);
