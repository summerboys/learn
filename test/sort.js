
// 二分法

function bSearch(arr = [], target) {
    let left = 0;
    let right = arr.length - 1;
    while(left <= right){
        let mid = Math.floor((left + right) / 2)
        if( target == arr[mid] ){
            return mid
        }
        if( target > arr[mid]){
            left = mid + 1
        }else {
            right = mid -1
        }
    }
    return -1
}

console.log(bSearch([1,2,3,4,5,6,7], 7))

// 排序

function bubbleSort(arr = []){
    // 是否冒泡
    let complete = true;
    for(let i = 0; i < arr.length -1 ; i++){
        for(let j = 0; j < arr.length - i - 1; j++){
            if(arr[j] > arr[j + 1]){
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
                complete = false
            }
        }
        // 没有冒泡结束循环
        if (complete) {
            break;
        }
    }
    return arr
}

console.log(bubbleSort([3,1,4,8,2,4,6,8]))