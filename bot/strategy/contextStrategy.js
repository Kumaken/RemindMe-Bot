const ctx = require('../../context')
const hello = require('../templates/hello')

const contextStrategy  = async (context, intent, message, user, event_name, datetime, personal_msg) => {
  let replies;

  let strategies = {

    'konteksA': async () => {
      replies = {
        type: "text",
        text: "saya di konteks B"
      }
      await ctx.setContext(user, null)
    },

    'default': async () => {
      switch (intent) {
        case "greet":
          replies = {
            type: "text",
            text: "Hollaa"
          }
          await ctx.setContext(user, "konteksA")
          break;
        default:
          replies = await hello(user)
          break;
      }
    }

  };
    
    try {
        await (strategies[context] || strategies['default'])();
    }
    catch(e) {
        console.error(e)
    }
  
    
  return replies;
}

module.exports = contextStrategy