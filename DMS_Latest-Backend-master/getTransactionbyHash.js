var nem = require("nem-sdk").default;

// Create an NIS endpoint object
var endpoint = nem.model.objects.create("endpoint")("http://b1.nem.foundation", nem.model.nodes.mijinPort);


// var searchEnabledEndpoint = nem.model.objects.create("endpoint")(nem.model.nodes.searchOnMijin[0].uri, nem.model.nodes.defaultPort);

var AllTransaction=nem.com.requests.transaction.byHash(endpoint,"1915d1dc1754ca78396100058a6ffdd9045f2aaff7200c0cdf30ffb9ac8e6685").then(function(res) {
console.log(AllTransaction)
      console.log(res.transaction.message.payload)
      var fmt = nem.utils.format.hexToUtf8(res.transaction.message.payload);
      console.log(fmt)
   

  
})
