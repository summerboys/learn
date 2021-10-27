function debounce(fn, delay){
    let timer = null;
    return (...args) => {
        if(timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}

function debounce(fn, delay) {
    let timer = null;
    return (...args) => {
        if(tiemr) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}

function thottle(fn, delay){
    let flag = true;

    return (...args) => {
        if(!flag) return 
        flag = false;
        setTimeout(() => {
            fn.apply(this, args);
            flag = true;
        }, delay);
    }
}

function thottle2(fn, delay){
    let timer = null;
    let prev = Date.now();
    return (...args) => {
        if(Date.now() - prev > delay){
            fn.apply(this, args)
            prev = Date.now();
            if(timer) clearTimeout(timer)
        }else {
            timer = setTimeout(() => {
                fn.apply(this, args)
                prev = Date.now();
            }, Date.now() - prev)
        }
    }
}
function thottle3(fn, delay){
    let flag = true;
    return (...args) => {
        if(!flag) return
        flag = false;
        setTimeout(() => {
            fn.apply(this, args)
            flag = true;
        }, delay)
    }
}

function thottle3(fn, delay){
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
// window._requestAnimationFrame = window.requestAnimationFrame || setTimeout(fn, 17);
// window.requestIdleCallback;
function query(str){
    let url = 'https://vc.feishu.cn/j/i?id=7016891736106598402&no=318721878'.split('?')[1];
    let map = {};
    url.replace(/(\w+)=(\w+)/g, (a,b,c) => {
        map[b] = c
    })
    return map[str]
}

console.log(query('id'))