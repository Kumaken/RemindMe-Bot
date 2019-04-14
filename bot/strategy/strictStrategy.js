const ctx = require('../../context')
const dbhandle = require('./dbhandle')
const util = require('util')

async function gettempdb(intent, message, user, event_name, datetime, personal_msg, target_num) {
    return dbhandle(intent, message, user, event_name, datetime, personal_msg, target_num);
}

const strictStrategy  = async (intent, message, user, event_name, datetime, personal_msg, target_num) => {
    let replies;
    let tempdb = await gettempdb(intent, message, user, event_name, datetime, personal_msg, target_num);
    if (intent == "event"){
        replies = {
            type: "text",
            text: "Event noted."
          }
    }
    else if (intent == "note"){
        replies = {
            type: "text",
            text: "Note noted."
          }
    }
    else if (intent == "shownotes"){
        temp = "Showing notes...\n";
        for(let i = 0; i<tempdb.length; i++){
            temp += tempdb[i].note_num+". " +tempdb[i].personalnote +"\n\n";
        }
        replies = {
            type: "text",
            text: temp
          }
    }
    else if (intent == "showevents"){
        temp = "Showing events...\n"
        for(let i = 0; i<tempdb.length; i++){
            temp += tempdb[i].event_num+". " +tempdb[i].eventname + "\n" + tempdb[i].date_time +"\n" + tempdb[i].personalnote +"\n\n";
        }
        replies = {
            type: "text",
            text: temp
          }
    }
    else if (intent == "delete event"){
        temp = "Deleting event "+target_num;
        replies = {
            type: "text",
            text: temp
          }
    }
    else if (intent == "delete note"){
        temp = "Deleting note "+target_num;
        replies = {
            type: "text",
            text: temp
          }
    }
    else if (intent == "delete all notes"){
        replies = {
            type: "text",
            text: "Deleting all notes..."
          }
    }
    else if (intent == "delete all events"){
        replies = {
            type: "text",
            text: "Deleting all events..."
          }
    }
    else{
        replies = {
            type: "text",
            text: "What?!"
          }
    }
    
    return replies;
}

module.exports = strictStrategy