'use strict';

require('now-env')
const line = require('@line/bot-sdk');
const restify = require('restify');
const server = restify.createServer();
const mongoose = require('mongoose');



if (process.env.MONGODB_URI) {
  // Load the models here
}

//MONGODB SNIPPET:



//reminder



/*
server.get('/remind',  (req, res, next) => {
  
  console.log('Remind')

})

mongoose.connect("mongodb://localhost:27017/test");
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback) {
    console.log("Connection succeeded.");
});*/


/*
var Schema = mongoose.Schema;

var EventSchema = new Schema({
        EventName: String,
        EventDate: String,
        Note: String
    });

var Event = mongoose.model("Event", EventSchema);
var event1 = new Event({
    EventName: "Tubes Party",
    EventDate: "03/15/2019 09:30",
    Note: "Don't be late plz."
})


event1.save(function(error){
    console.log("Event has been saved!");
    if (error){
        console.log("Error desu ne");
    }
});
*/

//find all in db


//MONGODB SNIPPET END

const handle = require('./handle');

// base URL for webhook server (otomatis ada bila deploy pake NOW, gaperlu diisi)
let baseURL = process.env.NOW_URL || 'localhost';

console.log(process.env.WIT_AI_ACCESS_TOKEN)

console.log(`BASEURL: ${baseURL}`)

const port = process.env.PORT || 3001;

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
};

server.get('/', (req, res, next) => {
    res.send("Hello")
    return next()
})

if (process.env.MONGODB_URI) {
    console.log('with db')
    server.listen(port, () => {
        mongoose.set('useFindAndModify', false)
        mongoose.connect(process.env.MONGODB_URI, {
          useNewUrlParser: true
      })
    });

    const db = mongoose.connection;
    db.on('error', (err) => console.log(err))

    db.once('open', () => {
        console.log(`Server with DB listening on PORT ${server.url}/webhook PORT ${port}`)
    })
}

else {

    server.listen(port, () => {
    console.log('no db')
    

    console.log(`Server listening on ${server.url}/webhook PORT ${port}`)
  })

}

server.post('/webhook', line.middleware(config), (req, res, next) => {
     Promise
     .all(req.body.events.map((event) => {
         handle(event, req)
     }))
     .then((result) => res.end())
     .catch((err) => {
       console.log(JSON.stringify(err))
    })
});