const postbackStrategy  = async (postback, data, user) => {
  let reply;
  let strategies = {
    'display': async () => {
      const getDisplay = require('../templates/display')
      reply = await getDisplay(data.page);
    },
    'default': () => {
      reply = {
        type: "text",
        text: "Maaf, ada kesalahan"
      }
    }
  };
    
  // invoke it
  await (strategies[postback] || strategies['default'])();
    
  // return a String with chosen drink
  return reply;
}

module.exports = postbackStrategy