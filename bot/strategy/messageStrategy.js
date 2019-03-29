const contextStrategy = require('./contextStrategy')
const strictStrategy = require('./strictStrategy')

module.exports = async (context, intent, message, user, event_name, datetime, personal_msg, target_num, callback,queryRes) => {
    console.log(`Got a message: ${message}`)
    let replies = await strictStrategy(intent, message, user, event_name, datetime, personal_msg, target_num) 
    /*if(callback)
        
    else{
        let replies = await strictStrategy(intent, message, user, event_name, datetime, personal_msg, target_num, callback,queryRes) || await contextStrategy(context, intent, message, user);
    }*/
    return replies;
}