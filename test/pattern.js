
// 1、 发布 - 订阅模式

class EventEmitter {
    constructor(){
        this.events = [];

    }

    on(type, cb){
        if(this.events[type]){
            this.events[type].push(cb)
        }else {
            this.events[type] = [cb]
        }
    }

    off(type, cb){
        if(this.events[type]){
            const index = this.events[type].indexOf(cb);
            if(index !== -1){
                this.events[type].splice(index, 1)
            }

        }
    }

    emit(type, ...args){
        if(this.events[type]){
            this.events[type].forEach(item => item(...args))
        }
    }

    once(type, cb){
        function fn(){
            cb();
            this.off(type, fn)
        }
        this.on(type, fn)
    }

}

// 观察者模式

class Observer {
    // 收到目标对象 通知时执行
    constructor(fn){
        if(typeof fn === 'function'){
            this.fn = fn
        }else {
            throw new Error('observe 必须是函数')
        }
    }

    update (){
        this.fn()
    }
}

// 目标对象

class Subject {
    constructor(){
        // 观察对象
        this.observerList = []
    }

    // 新增观察者
    addObserver(observe){
        this.observerList.push(observe)
    }

    // 通知 
    notify(){
        this.observerList.forEach(observe => {
            observe.update()
        })
    }
}