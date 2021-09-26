
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

// 6、寄生组合继承

function Parent(name){
    this.name = name;
    this.say = () => {
        console.log(111)
    }
}

Parent.prototype.play = () => {
    console.log(222)
}

function Children(name){
    Parent.call(this)
    this.name = name
}

Children.prototype = Object.create(Parent.prototype)

Children.prototype.constructor = Children;

// 7、 并发限制 promise 调度器

class Scheduler{
    constructor(limit){
        this.queue = [];
        this.maxCount = limit;
        this.runCounts = 0;
    }

    add(time, order){
        const promiseCreator = () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log(order)
                    resolve
                }, time)
            })
        }
        this.queue.push(promiseCreator)
    }
    taskStart(){
        for(let i = 0; i < this.maxCount; i++){
            this.request()
        }
    }
    request(){
        if(!this.queue || !this.queue.length || this.runCounts >= this.maxCount){
            return
        }
        this.runCounts++;
        this.queue.shift()().then(() => {
            this.runCounts--;
            this.request();
        })
    }
}

const scheduler = new Scheduler(2);

const addTest = (time, order) => {
    scheduler.add(time, order)
}

function sendRequest(urls = [], max = 2, callback){
    let finished = 0;
    const total = urls.length;
    function handler(){
        if(urls.length){
            const url = urls.shift();
            fetch(url).then(() => {
                finished++
                handler()
            }).catch(e =>{
                throw Error(e)
            })
        }
        if(finished >= total ){
            callback()
        }
    }
    for(let i = 0; i < max; i++){
        handler()
    }
    
}

// 8 new 操作符

function myNew(fn, ...args){
    let obj = Object.create(fn.prototype);
    let res = fn.call(obj, ...args);
    if(res && typeof res === 'object' || typeof res === 'function'){
        return res
    }
    return obj
}

// 9 call apply bind

Function.prototype.myCall = (content, ...args) => {
    if(!content || content === null){
        content = Window;
    }
    let fn = Symbol();
    content[fn] = this;
    return content[fn](...args)

}

Function.prototype.myApply = (content, args) => {
    if(!content || content === null){
        content = Window;
    }

    let fn = Symbol();
    content[fn] = this;
    return content[fn](...args)
}

// 10 深拷贝

function isObject(val){
    return typeof val === 'object' && val !== null;
}

function deepClone(obj, hash = new WeakMap){
    if(!isObject(obj)) return obj;
    if(hash.has(obj)) {
        return hash.get(obj)
    }
    let target = Array.isArray(obj) ? [] : {};
    hash.set(obj, target);
    Reflect.ownKeys(obj).forEach((item) => {
        if(isObject(obj[item])){
            target[item] = deepClone(obj[item], hash)
        }else {
            target[item] = obj[item]
        }
    })

    return target;
}

// 11、instanceof 

function myInstanceof(left, right){
    while(true){
        if(left === null){
            return false;
        }
        if(left.__proto__ === right.prototype){
            return true
        }
        left = right.__proto__
    }
}

// 12 柯里化

function curry(fn, ...args){
    const length = fn.length;
    let allArgs = [...args];
    const res = (...newArgs) => {
        allArgs = [...allArgs, ...newArgs];
        if(allArgs.length === length){
            return fn(...allArgs)
        }else {
             return res
        }
    }
    return res
}

// 13 排序

function bubbleSort(arr = []){
    const len = arr.length;
    for(let i = 0; i < len; i++){
        for(let j = 0; j < len - 1; j ++){
            if(arr[j] > arr[j + 1]){
                [arr[j], arr[j + 1]] = [arr[j + 1 ], arr[j]]
            }
        }
    }
    return arr;
}


function quickSort(arr = []){
    if(arr.length < 2){
        return arr
    };
    const cur = arr[arr.length - 1]
    const left = arr.filter((v, i) => v <= cur && i !== arr.length - 1);
    const right = arr.filter((v) => v > cur);
    return [...quickSort(left), cur, ...quickSort(right)]
}

// 18 二分查找

function search(arr = [], target, start, end){
    let targetIndex = -1;
    const mid = Math.floor((start + end) / 2)
    
    if(arr[mid] === target){
        return mid
    }

    if(start >= end){
        return targetIndex
    }

    if(arr[mid] < target){
        return search(arr, target, mid + 1 , end)
    }else {
        return search(arr, target, start, mid - 1)
    }
}

// 12、lazyMan

class LazyMan{
    constructor(name){
        this.tasks = [];
        const task = () => {
            console.log(`Hi! this is ${name}`)
            this.next()
        }
    }
    next(){
        const task = this.tasks.shift();
        task && task();
    }
    sleep(time){
        this._sleepWrapper(time, false)
        return this;
    }
    sleepFirst(time){
        this._sleepWrapper(time, true)
        return this
    }
    _sleepWrapper(time, first){
        const task = () => {
            setTimeout(() => {
                console.log('2222')
                this.next()
            },time)
        }
        if(first){
            this.tasks.unshift(task)
        }else {
            this.tasks.push(task)
        }
    }
    eat(name){
        const task = () => {
            console.log('eat')
            this.next()
        }
        this.tasks.push(task)
        return this
    }
}

// 节流防抖

function debounce(fn, delay = 300){
    let timer = null;
    return (...args) => {
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}

function throttle(fn, delay = 300){
    let prev = Date.now();
    return (...args) => {
        if(Date.now() - prev > delay){
            fn.apply(this, args)
            prev = Date.now();
        }
    }
}

// 19 链表反转 null =>  head => head.next  
// 中间变量缓存 next  把初始值 null 付给 head.next 把head 存在下次初始值 把缓存的值赋值给当前的值

function reverseList(head){
    let prevNode = null;
    while(head){
        let tempNext = head.next;
        head.next = prevNode;
        prevNode = head;
        head = tempNext
    }
    return prevNode 
}

// 20 版本号排序

const versionArr = ['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5'];

function versionSort (arr = []){
    arr.sort((a, b) => {
        let i = 0;
        const arr1 = a.split('.')
        const arr2 = b.split('.')
        while(true){
            const s1 = arr1[i];
            const s2 = arr2[i];
            i++;
            if(s1 === undefined || s2 === undefined){
                return arr2.length - arr1.length
            }
            if(s1 === s2) continue 
            return s2 - s1
        }
    })
}

// 20 LRU 缓存

class LRUCache{
    constructor(capacity){
        this.secretKey = new Map();
        this.capacity = capacity
    }

    get(key){
        if(this.secretKey.has(key)){
            let tempValue = this.secretKey.get(key);
            this.secretKey.delete(key)
            this.secretKey.set(key. tempValue)
            return tempValue
        }else {
            return -1
        }
    }
    put(key, value){
        if(this.secretKey.has(key)){
            this.secretKey.delete(key)
            this.secretKey.set(key, value)
        }else if(this.secretKey.size < this.capacity){
            this.secretKey.set(key, value)
        }else {
            this.secretKey.set(key, value);
            this.secretKey.delete(this.secretKey.keys().next().value)
        }
    }
}

// 21 Promise 

class MyPromise{
    constructor(fn){
        this.state = 'pending'
        this.successFn = [];
        this.failFn = [];

        let resolve = (val) => {
            if(this.state !== 'pending') return;
            this.state = 'success';
            setTimeout(() => {
                this.successFn.forEach(item => item.call(this, val))
            })
        }
        let reject = (err) => {
            if(this.state !== 'pending') return 
            this.state = 'fail'
            setTimeout(() => {
                this.failFn.forEach(item => item.call(this, err))
            })
        }
        try{
            fn(resolve, reject)
        } catch(e){
            reject(e)
        }
    }
    then(resolveCallback, rejectCallback){
        resolveCallback = typeof resolveCallback !== 'function' ? (v) => v : resolveCallback;
        rejectCallback = typeof rejectCallback !== 'function' ? (err) => {
            throw(err)
        } : rejectCallback;
        return new MyPromise((resolve, reject) => {
            this.successFn.push((val) => {
                try{
                    let x = rejectCallback(val);
                    x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
                }catch (error) {
                    reject(error)
                }
            })
            this.failFn.push((val) => {
                try{
                    let x = rejectCallback(val);
                    x instanceof MyPromise ? x.then(resolve, reject) : reject(x)
                }catch(error){
                    reject(error)
                }
            })
        })
    }

    static resolve(value) {
        return new MyPromise((resolve, reject) => resolve(value))
    }

    static reject(error) {
        return new MyPromise((resolve, reject) => reject(error))
    }

    static all (arr = []){
        return new MyPromise((resolve, reject) => {
            const len = arr.length;
            const result = []
            let count = 0;
            for(let i = 0; i < len; i++){
                MyPromise.resolve(arr[i]).then((res) => {
                    count++
                    result[i] = res;
                    if(count >= len) resolve(result)
                }, (rej) => {
                    reject(rej)
                })
            }
        })
    }
    
    static race(promiseArr = []){
        return new MyPromise((resolve, reject) => {
            for(let i = 0; i < promiseArr.length; i++){
                MyPromise.resolve(promiseArr[i]).then(res => {
                    resolve(res)
                }, err => {
                    reject(err)
                })
            }
        })
    }

}

// 23 add 方法

function add(...args){
    let allArgs = [...args];
    function fn(...newArgs){
        allArgs = [...allArgs, ...newArgs]
    }
    fn.toString = function(){
        if(!allArgs.length){
            return 
        }
        return allArgs.reduce((sum, cur) => sum + cur, 0)
    }
    return fn
}

// 24 动态规划 硬币找零问题

function coinChange(coins = [], amount){
    const f = [];
    f[0] = 0
    for(let i = 0; i <= amount; i++){
        f[i] = Infinity;
        for(let j = 0; j < coins.length; j++){
            if(i - coins[j] >= 0){
                fn[i] = Math.min(fn[i], f[i - coins[j] + 1])
            }
        }
    }
    if(f[amount] === Infinity) {
        return -1
    }
    return f[amount]
}

// 26 dom to json 

function domToJson(domTree){
    let obj = {};
    obj.name = domTree.tagName;
    obj.children = [];
    domToJson.childrenNodes.forEach(child => obj.children(push(domToJson(child))))
    return obj
}

// 27 Object is 
Object.prototype.myIs = function(x, y) {
    if(x === y){
        return x !== 0 || 1 / x === 1/y
    }
    return x !== x && y !== y
}

// 28 ajax 

const getJson = function(url){
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, false)
        xhr.setRequestHeader('content-type', 'application/json')
        xhr.onreadystatechange = function(){
            if(xhr.readyState !== 4) return;
            if(xhr.status === 2 || xhr.status === 304){
                resolve(xhr.responseText)
            }else {
                reject(new Error(xhr.responseText))
            }
        }
        xhr.send();
    })
}

// 30 分片进行大数据渲染

let ul = document.getElementById('#container');
let total = 10000;
let once = 20;
let page = total/once;
let index = 0;
function loop(curTotal, curIndex){
    if(curTotal < 0){
        return false
    }
    let pageCount = Math.min(curTotal, once);
    window.requestAnimationFrame(function() {
        for(let i = 0; i < pageCount; i ++){
            let li = document.createElement('li');
            li.innerText = curIndex + i + ':' + ~~(Math.random()*total)
            ul.appendChild(li)
        }
        loop(curTotal - pageCount, curIndex + pageCount)
    })
}


// 31 虚拟dom 转真是dom

function _render(vnode){
    if(typeof vnode === 'number'){
        vnode = String(vnode)
    }
    if(typeof vnode === 'string'){
        return document.createTextNode(vnode)
    }
    const dom = document.createElement(vnode.tag);
    if(vnode.attrs){
        Object.keys(vnode.attrs).forEach(attr => {
            const value = vnode.attrs[attr]
            dom.setAttribute(attr, value)
        })
    }
    vnode.children.forEach(child => dom.appendChild(_render(child)))
    return dom
}

// 32 对象 flatten

function isObject(val){
    return typeof val === 'object' && val !== null
}

function objFlatten(obj){
    if(!isObject(obj)) return 
    let res = {};
    const dfs = (cur, prefix) => {
        if(isObject(cur)){
            if(Array.isArray(cur)){
                cur.forEach((item, index) => {
                    dfs(item, `${prefix}[${index}]`)
                })
            }else {
                for(let i in cur){
                    dfs(cur[i], `${prefix}${prefix ? '.' : ''}${i}`)
                }
            }
        }else {
            res[prefix] = cur
        }
    }
    dfs(obj, '')
    return res;
}

// 33 列表转树结构

function listToTree(data = []){
    let temp = {};
    let treeData = [];
    for(let i = 0; i < data.length; i++){
        temp[data[i].id] = data[i]
    }
    for(let i in temp){
        if(+temp[i].parentId !=0){
            if(!temp[temp[i].parentId].children){
                temp[temp[i].parentId].children = []
            }
            temp[temp[i].parentId].children.push(temp[i])
        }else {
            treeData.push(temp[i])
        }
    }
    return treeData
}

function treeToList(data = []) {
    let res = [];
    const dfs = (tree = []) => {
        tree.forEach(item => {
            if(item.children){
                dfs(item.children);
                delete item.children
            }
            res.push(item)
        })
    }
    dfs(data)
    return res
}

// 35 大数相加

function maxAdd(a = '', b = ''){
    let maxLength = Math.max(a.length, b.length);
    a = a.padStart(maxLength, 0)
    b = b.padStart(maxLength, 0)
    let t = 0;
    let f = 0;
    let sum = '';
    for(let i =maxLength -1; i>=0;i--){
        t = parseInt(a[i] + parseInt(b[i])) + f;
        f = Math.floor(t/10);
        sum = t%10 + sum
    }
    if(f!==0){
        sum = '' + f + sum
    }
    return sum
}

// 3 无重复子串长度

function lengthSubString(s = ''){
    let arr = [],
        max = 0;
    for(let i of s){
        if(arr.includes(i)){
            let index = arr.includes(i);
            arr.splice(0, index + 1)
        }
        arr.push;
        max = arr.length > max ? arr.length : max;
    }
    return max
}

// 4 two sum 

function twoSum(nums = [],target){
    let res = {};
    for(let i =0;i< nums.length; i++){
        if(res[nums[i]] !== undefined){
            return [nums[i], res[nums[i]]]
        }else {
            res[target - nums[i]] = nums[i]
        }
    }
    return []
}

// 5 买卖股票最佳时机

function maxPoint(arr = []){
    let p = 0,
        min = arr[0];
    for(let i = 0; i < arr.length; i++){
        min = Math.min(min, arr[i])
        p = Math.max(p, arr[i] - min)
    }
    return p
}