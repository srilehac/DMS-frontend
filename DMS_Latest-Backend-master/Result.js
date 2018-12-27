//total block size
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

function result(Block_Size,size,fees,n) {
    if (n == 0 || Block_Size == 0){ 
    return 0;
    }else if(size[n-1]>Block_Size){
       return result(Block_Size,size,fees,n-1); 
    }  else{ 
        return Math.max(fees[n-1] + result(Block_Size-size[n-1], size, fees, n-1),result(Block_Size, size, fees, n-1));
    }
    }
 
  var res=12.50+result(1000000,size,fees,n);
  console.log(res)