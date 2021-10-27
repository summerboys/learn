const a = 3;
function foo(){
    const a = 2;
    return () => {
        console.log(a)
    }
}

function bar (){
    const a = 1;
    let func = foo();
    return func
}

let run = bar();
run()