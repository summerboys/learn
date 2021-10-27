// 实现一个事件总线 EventBus, 包含事件监听，监听一次，解绑，触发。
// 事件名可以是任意的，同一事件可以绑定多次

class EventBus {
    constructor(){
        this.event = {}
    }
    // 绑定
    on(eventName, callback) {
      if(this.event[eventName]){
          this.event[eventName].push(callback)
      }else {
          this.event[eventName] = [callback]
      }
    }
  
    // 绑定事件，同 on，但是通过 once 绑定的事件只能 emit 一次
    once(eventName, callback) {
    //   function fn(){
    //       callback();
    //       this.off(eventName, fn)
    //   }
    callback.flag = false;
    this.on(eventName, callback)

    //   this.on(eventName, callback)
    }
  
    // 解绑
    off(eventName, callback) {
      if(this.event[eventName]){
          this.event[eventName] = this.event[eventName].filter(item => item !== callback)
      }
    }
  
    // 触发
    emit(eventName) {
      if(this.event[eventName]){
          this.event[eventName].forEach(item => {
              if(!item.flag){
                item();
                if(item.flag === false) item.flag = true
              }
          })
      }
    }
  }
  
  
//   // eg:
//   const instance = new EventBus();
//   const fn1 = () => console.log('click1');
//   const fn2 = () => console.log('click2');
  
//   instance.on('click', fn1);
//   instance.on('click', fn2);
//   instance.emit('click'); // 输出 click1 click2
//   instance.off('click', fn2);
//   instance.emit('click'); // 输出 click1
//   instance.once('click', fn2);
//   instance.emit('click'); // 输出 click1 click2
//   instance.emit('click'); // 输出 click1

// 实现一个带并发限制的异步调度器Scheduler，保证同时运行的任务最多 n 个。

class Scheduler {
    /**
     * @param {*} n 最大并发量
     */
    constructor(n) {
        this.max = n;
        this.count = 0;
        this.task = [];
    }
  
    add(task) {
      this.task.push(task)
      return new Promise(() => 
      {
          _schedule()
        })
    }
  
    _schedule() {
      if(this.count <= this.max){
        this.count++;
        let currentTask = this.task.shift();
        return Promise.resolve(currentTask()).then((resolve) => {
            this.count--;
            this.task.length && this._schedule();
        })
      }else {

      }
    }
  }
  
  // Usage
  const timeout = (time) => {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  }
  // 限制并发量为 2 个
  const scheduler = new Scheduler(2);
  const addTask = (time, order) => {
    scheduler
      .add(() => timeout(time))
      .then(() => console.log(order));
  };
  
  addTask(1000, '1');
  addTask(500, '2');
  addTask(300, '3');
  addTask(400, '4');
  // output: 2 3 1 4
  // 一开始，1、2两个任务开始执行
  // 500ms时，2完成，输出2，任务3进队
  // 800ms时，3完成，输出3，任务4进队
  // 1000ms时，1完成，输出1
  // 1200ms时，4完成，输出4