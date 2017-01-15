var affiliate = require('snapdeal-affiliate-client');
var sd = require('./sd_details.js');

var client = affiliate.createClient({
  SdAffId: sd.id,
  SdAffToken: sd.token,
  responseType: sd.type
});

module.exports = client;