const ctx = require('../../context')

module.exports = async (user) => {
  try {
    let replies = [];
    replies.push({
      type: 'text',
      text: 'Halo yay!'
    })
    return replies
  }
  catch(e) {
    throw new Error(e)
  }    
}