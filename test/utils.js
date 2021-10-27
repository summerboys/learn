
// 1、 防抖 

function debounce(fn, delay){
    let timer = null;
    return (...args) => {
        if(timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}

function debounce(fn, delay){
    let timer = null;
    return (...args) => {
    
    }
}

// hooks 防抖 

const useDebounce = (fn, delay, def) => {
    const timer = useRef(null);
    return useCallback((...args) => {
        if(timer.current) clearTimeout(timer.current)
        timer.current = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }, def)
}

const useDebounce = (fn, delay, def) => {
    const timer = useRef(null);
    return useCallback((...args)  => {
        if(timer.current) clearTimeout(timer.current)
        timer.current = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }, def)
}


const useDebounce = (fn, delay, def) => {
    const timer = useRef(null);
    return useCallback((...args) => {
        if(timer.current) clearTimeout(timer.current)
        timer.current = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    })
}

// 2 节流 

function throttle(fn, delay){
    let flag = true;
    return (...args) => {
        if(!flag) return;
        flag = false;
        setTimeout(() => {
            fn.apply(this, args)
            flag = true;
        }, delay);
    }
}


const useThrottle = (fn, delay, def) => {
    const { current } = useRef({fn, timer: null, prev: Date.now()})
    useEffect(() => {
        current.fn = fn
    }, [fn])
    return useCallback((...args) => {
        if(Date.now() - current.prev > delay){
            fn.apply(this, args)
            current.prev = Date.now()
        }
    })
}

// 深拷贝

function isObject(obj){
    return typeof obj === 'object' && obj !== null;
}

function deepClone(obj, weakObj = new WeakMap){
    if(!isObject(obj)) return obj;
    if(weakObj.has(obj)){
        return weakObj.get(obj)
    }
    let newObj = Array.isArray(obj) ? [] : {};
    weakObj.set(obj, newObj);
    Reflect.ownKeys(obj).forEach(item => {
        if(isObject(obj[item])){
            newObj[item] = deepClone(obj[item])
        }else {
            newObj[item] = obj[item]
        }
    })
    return newObj
}

function isObj(obj){
    return typeof obj === 'object' && obj !== null;
}

function deepClone2(obj, weakObj = new WeakMap){
    if(!isObject(obj)) return obj
    if(weakObj.has(obj)){
        return weakObj.get(item)
    }
    let newObj = Array.isArray(obj) ? [] : {};
    weakObj.set(obj, newObj)
    Reflect.ownKeys(obj).forEach(item => {
        if(isObject(obj[item])){
            newObj[item] = deepClone2(obj[item])
        }else{
            newObj[item] = obj[item]
        }
    })
    return newObj
}

function quickSort2(arr = []){
    if(arr.length < 2){
        return arr
    }
    let target = arr[0];
    let left = [],
        right = [];
    for(let i = 1; i < arr.length; i++){
        if(arr[i] < target){
            left.push(arr[i])
        }else {
            right.push(arr[i])
        }
    }
    return [...quickSort2(left), target, ...quickSort2(right)]
}

function quickSort3(arr = []){
    if(arr.length < 2){
        return arr;
    }
    let target = arr[0];
    let left = [],
        right = [];
    for(let i = 1; i < arr.length; i++){
        if(arr[i] < target){
            left.push(arr[i])
        }else {
            right.push(item)
        }
    }
    return [...quickSort3(left), target, ...quickSort3(right)]
}