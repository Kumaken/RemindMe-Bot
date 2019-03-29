const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://test:test123@cluster0-zsbvg.mongodb.net/test?retryWrites=true";
/*
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = MongoClient.db("test").collection("");
  // perform actions on the collection object
  client.close();
});*/

  async function dbResponse( intent, message, user, event_name, datetime, personal_msg, target_num){
    let result = -999;
    if (intent == "event"){
      //insert to database, 1 entry only
        await MongoClient.connect(uri, {useNewUrlParser: true }, async function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        
        num = await dbo.collection("events").countDocuments() + 1;
        var myobj = { event_num: num, eventname: event_name, date_time: datetime, personalnote: personal_msg };
        await dbo.collection("events").insertOne(myobj, async function(err, res) {
          if (err) throw err;
          console.log("1 Event Made!");
          db.close();
        });
      });
    }
    else if (intent == "note"){
        //insert to database, 1 entry only
        await MongoClient.connect(uri, {useNewUrlParser: true },  async function(err, db) {
          if (err) throw err;
          var dbo = db.db("mydb");

          num = await dbo.collection("notes").countDocuments() + 1;
          var myobj = {note_num: num, personalnote: personal_msg };
          dbo.collection("notes").insertOne(myobj, async function(err, res) {
            if (err) throw err;
            console.log("1 Note Made!");
            db.close();
          });
        });
    }
    else if (intent == "delete all events"){
        //delete all
        MongoClient.connect(uri, function(err, db) {
          if (err) throw err;
          var dbo = db.db("mydb");
          var myquery = {};
          dbo.collection("events").deleteMany(myquery, function(err, obj) {
            if (err) throw err;
            console.log("All events deleted");
            db.close();
          });
        });
    }
    else if (intent == "deleteallnotes"){
      //delete all
      MongoClient.connect(uri, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var myquery = {};
        dbo.collection("notes").deleteMany(myquery, function(err, obj) {
          if (err) throw err;
          console.log("All notes deleted");
          db.close();
        });
      });
    }
    else if(intent == "showevents"){
      let dbtest = await MongoClient.connect(uri, {useNewUrlParser: true });
      var dbo = await dbtest.db("mydb");
      let thing = await dbo.collection("events").find({}).toArray();
      console.log(thing);
      await dbtest.close();
      return thing;
    }
    else if(intent == "delete event"){
      //show database
      let dbtest = await MongoClient.connect(uri, {useNewUrlParser: true });
      var dbo = await dbtest.db("mydb");
      console.log('DELETED EVENT HERE');
      await dbo.collection("events").deleteOne({event_num : target_num});
    }
    else if(intent == "delete note"){
      //show database
      let dbtest = await MongoClient.connect(uri, {useNewUrlParser: true });
      var dbo = await dbtest.db("mydb");
      console.log('DELETED NOTE HERE');
      await dbo.collection("notes").deleteOne({note_num : target_num});
    }
    else if(intent == "shownotes"){
      //show database
      let dbtest = await MongoClient.connect(uri, {useNewUrlParser: true });
      var dbo = await dbtest.db("mydb");
      let thing = await dbo.collection("notes").find({}).toArray();
      console.log(thing);
      await dbtest.close();
      return thing;
    }
  }


async function dbhandling(intent, message, user, event_name, datetime, personal_msg, target_num){
    let res= await dbResponse(intent, message, user, event_name, datetime, personal_msg, target_num);
    console.log("DB handled." + res);
    return res;
}

module.exports = async (intent, message, user, event_name, datetime, personal_msg, target_num) => await dbhandling(intent, message, user, event_name, datetime, personal_msg, target_num);

/*
module.exports = await (intent, message, user, event_name, datetime, personal_msg, target_num) => {
    return await dbhandling(intent, message, user, event_name, datetime, personal_msg, target_num);
}
*/
