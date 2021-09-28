
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

// hooks 防抖 

const useDebounce = (fn, delay, def) => {
    const timer = useRef(null);
    return useCallback((...args) => {
        if(timer.current) clearTimeout(timer.current)
        timer.current = setTimeout(() => {
            fn.apply(this, args)
        })
    }, def)
}

// 2 节流 

function throttle(fn, delay){
    let prev = Date.now();
    return (...args) => {
        if(Date.now - prev > delay){
            fn.apply(this, args)
            prev = Date.now();
        }
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