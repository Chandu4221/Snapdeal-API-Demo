var client = require('./details/client');


var getProductsFeed = function(url,callback)
{
client.getProductsFeed({url:url},function(err,result){
    if(!err)
      return callback(result);
    else
      return callback(err);
  });
};

module.exports = getProductsFeed;