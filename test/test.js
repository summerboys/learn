
// 1  compose 

function compose(...fn){
    if(!fn.length) return (v) => v;
    if(fn.length === 1) return fn[0];
    return fn.reduce(
        (pre, cur) => 
            (...args) => 
                pre(cur(...args))
    )
}

// 2 setTimeout 模拟实现 setInterval

function mySetInterval(fn, time) {
    let timer = null;
    function interval(){
        fn()
        timer = setTimeout(interval, time)
    }
    interval();
    return {
        cancel: () => {
            clearTimeout(timer)
        }
    }
}

// 3 发布订阅模式

class EventEmitter {
    constructor () {
        this.events = {}
    }

    // 实现订阅
    on(type, callback) {
        if(!this.events[type]){
            this.events[type] = [callback]
        }else {
            this.events[type].push(callback)
        }
    }

    // 删除订阅

    delete(type, callback){
        if(!this.events[type]) return ;
        this.events[type] = this.events[type].filter(item => {
            return item !== callback
        })
    }

    // 只执行一次
    once(type, callback){
        function fn() {
            callback();
            this.delete(type, fn)
        }
        this.on(type, fn)
    }

    // 触发
    emit(type, ...args){
        this.events[type] && this.events[type].forEach(fn => fn.apply(this, args))
    }
}

// 4 数组去重

function uniqueArr(arr){
    return [...new Set(arr)]
}

// 5 数组扁平化

function flatter (arr) {
    if(!arr.length) return 
    return arr.reduce(
        (pre, cur) => 
            Array.isArray(cur) ? [...pre, ...flatter(cur)] : [...pre, cur]
    )
}

function flatter2(arr){
    if(!arr.length) return;
    while(arr.some(item => Array.isArray(item))){
        arr = [].concat(...arr)
    }
    return arr
}