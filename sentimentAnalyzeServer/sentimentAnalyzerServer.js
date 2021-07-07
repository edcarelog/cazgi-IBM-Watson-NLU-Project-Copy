const express = require('express');
const app = new express();
const dotenv = require('dotenv');
dotenv.config();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2021-03-25',
        authenticator: new IamAuthenticator({
            apikey: api_key, 
        }),
        serviceUrl: api_url,  
    });
    

const analyzeParams = {
    'url': 'www.ibm.com',
    'features': {
      'entities': {
        'emotion': true,
        'sentiment': true,
        'limit': 2,
      },
      'keywords': {
        'emotion': true,
        'sentiment': true,
        'limit': 2,
      },
    },
};

naturalLanguageUnderstanding.analyze(analyzeParams)
    .then(analysisResults => {
      console.log(JSON.stringify(analysisResults, null, 2));
    })
    .catch(err => {
      console.log('error:', err);
    });

    return naturalLanguageUnderstanding;
}

    
    app.get("/url/emotion", (req,res) => {
        return res.send("Response about emotion"+req.query.emotion);
    });
    
    app.get("/url/sentiment", (req,res) => {
        return res.send("Response about sentiment"+req.query.sentiment);
    });
    
    app.get("/text/emotion", (req,res) => {
        return res.send("Response about emotion"+req.query.emotion);
    });
    
    app.get("/text/sentiment", (req,res) => {
        return res.send("Response about sentiment"+req.query.sentiment);
    });
       
    
    app.listen(8080, () => {
        console.log(`Listening at http://localhost:8080`)
    })