// 统计数量

function countNumber(arr = []){
    let map = {},
        max = 1;
    arr.reduce((pre, cur) => {
        if(pre[cur]){
            pre[cur]++
            max = Math.max(max, pre[cur])
        }else {
            pre[cur] = 1;
        }
        return pre
    }, map)
    return {max, map}
}

console.log(countNumber([1,2,3,4,5,6,6]))

function addMax(a = '', b = ''){
    let maxLen = Math.max(a.length, b.length)
    a = a.padStart(maxLen, '0')
    b = b.padStart(maxLen, '0')
    let sum = '',
        t = 0, 
        l = 0;
    for(let i = maxLen - 1; i >= 0; i--){
        t = parseInt(a[i]) + parseInt(b[i]) + l,
        l = Math.floor(t/10)
        sum = t%10 + sum
    }
    if(l !== 0){
        sum = '' + l + sum
    }
    return sum
}

console.log(addMax('1111111111111', '2222222222'))
