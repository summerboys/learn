var p1 = Promise.resolve(1); 
 var p2 = Promise.resolve(p1); 
 var p3 = new Promise(function (resolve, reject) {
   resolve(1);
 });
 var p4 = new Promise(function (resolve, reject) {
 	 console.log('success')
   resolve(p1);
 });
 console.log(p1 === p2); // true     p1处于resolve的状态，p2的resolve直接是p1现在的结果，所以他们都是p1的resolve的结果
 console.log(p1 === p3); // false    p1和p3虽然都是resove的1，但是他们不是同一个promise的实例
 p4.then(function (value) {
   console.log('p4=' + value);   
 });
p2.then(function (value) {
   console.log('p2=' + value);
 });
p1.then(function (value) {
  console.log('p1=' + value);
});

function add(a,b,cb) {
  return  cb(a+b)
}

function promiseAdd(a, b){
  return new Promise((resolve) => {
    let res = add(a, b)
    resolve(res)
  })
}