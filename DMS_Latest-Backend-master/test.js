//total block size
var Block_Size=1000000;
var AdditionalFees=12.5;
var result;
var n=12
var sum=0;
var sum1=0;
var fees=[0.0887,0.1856,0.2307,0.1522,0.0532,0.0250,0.1409,0.2541,0.1147,0.2660,0.2933,0.0686]
var size =[57247, 98732,134928,77275,29240,15440,70820,139603,63718,143807,190457,40572];
for(var i = 0; i < fees.length; i++){
  sum += fees[i]
  sum1 += size[i]
}
var totalfees=sum;
var totalsize=sum1;
console.log('Summation of total tx fees ' + sum);
console.log('Summation of total tx size ' + sum1);

var promise=new Promise(function Cal_Rewards(Block_Size,totalfees,totalsize,n){
if(Block_Size===0 || n===0){
console.log("nothing to mine")
}else if(totalsize>=Block_Size){
  console.log("condition fail block size exceeds")
  if(totalsize[n-1]<=Block_Size){
    for(var i = 0; i < n-1; i++){
      newsum += totalfees[i]
      newsum1 += totalsize[i]
    }
    console.log('Summation of total tx fees ' + newsum);
    console.log('Summation of total tx size ' + newsum1);
    
     return newsum;

  }

}
})


promise.then({function(value){
  console.log("======>",value)
}
})
