var nem = require("nem-sdk").default;

exports.getDetails = (hash) =>

new Promise(async (resolve, reject) => {
// Create an NIS endpoint object
var endpoint = nem.model.objects.create("endpoint")("http://b1.nem.foundation", nem.model.nodes.mijinPort);


// var searchEnabledEndpoint = nem.model.objects.create("endpoint")(nem.model.nodes.searchOnMijin[0].uri, nem.model.nodes.defaultPort);

var AllTransaction=await nem.com.requests.transaction.byHash(endpoint,hash)

      console.log(AllTransaction)
      console.log(AllTransaction.transaction.message.payload)
      var fmt = nem.utils.format.hexToUtf8(AllTransaction.transaction.message.payload);
      console.log("fmt==========>",fmt);
      var result=JSON.parse(fmt);
      console.log("result===============>",result);
      
      return resolve({
          result:result
      })
     

})
