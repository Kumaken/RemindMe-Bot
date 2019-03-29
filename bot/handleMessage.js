const ctx = require('../context')
const messageStrategy = require('./strategy/messageStrategy')
const {Wit, log} = require('node-wit');

const witClient = new Wit({
    accessToken: process.env.WIT_AI_ACCESS_TOKEN,
    logger: new log.Logger(log.DEBUG)
});

module.exports = async (user, message) => {

    console.log(`Got a message: ${message}`)
    let context = await ctx.getContext(user);
    console.log(`Context is: ${JSON.stringify(context)}`)

    let intent;
    let payload;
    let datetime;
    let event_name;
    let target_num;

    try {
        let data = await witClient.message(message, {})
        //if (Array.isArray(data.entities.event)) {
        intent = data.entities.bot_intention[0].value || data.entities.intent[0].value;
        payload = data;
        /*}
        else {
            intent = null;
            payload = data;
        }*/
        
        target_num = -999;
        if (intent == "note"){
            personal_msg = data.entities.personal_note[0].value;
            event_name = null;
            datetime = null;
        }
        else if (intent == "event"){
            personal_msg = data.entities.personal_note[0].value;
            event_name = data.entities.event[0].value;
            datetime = data.entities.datetime[0].value;
        }
        else{
            event_name = null;
            datetime = null;
            personal_msg = null;
            if (intent == "delete event" || intent == "delete note"){
                target_num = data.entities.number[0].value;
            }
        }
        console.log(`Intent is: ${intent}`)
        let replies = await messageStrategy(context, intent, message, user, event_name, datetime, personal_msg, target_num);
        console.log(`REPLIES: ${replies}`)
        return replies;
    }
    catch(e) {
      console.error(e);
      return {
        "type": "text",
        "text": "Maaf, ada kesalahan."
      }
    }    
}