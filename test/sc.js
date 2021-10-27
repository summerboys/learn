// new Promise((resolve, reject) => {
//     console.log(1);
//     setTimeout(() => {
//         console.log(2);
//     }, 10);
//     setTimeout(() => {
//         console.log(8)
//     }, 20);
//     resolve();
// }).then(() => {
//     console.log(3);
// }).then(() => {
//     return new Promise((resolve, reject) => {
//         console.log(4);
//     }).then(() => {
//         console.log(5);
//     });
// }).then(() => {
//     console.log(6);
// });
// console.log(7);
    
    
// 1 7 3 4 2 8
    
    
    
    // // 实现 (5).add(3).minus(2) 功能
    
    // Number.prototype.add = function (value) {
    //     let  number = parseFloat(value);
    //     if (typeof number !== 'number' || Number.isNaN(number)) {
    //         throw new Error('请输入数字或者数字字符串～');
    //     };
    //     return this + number;
    // };
    // Number.prototype.minus = function (value) {
    //     let  number = parseFloat(value);
    //     if (typeof number !== 'number' || Number.isNaN(number)) {
    //         throw new Error('请输入数字或者数字字符串～');
    //     }
    //     return this - number;
    // };
    // console.log((5).add(3).minus(2));
    
    
    // const add = () => {
        
    // }
    
    // const _curry = function (fn,...args1) {
    //     return function (...args2) {
    //         if (fn.length > args2.length) {
    //             fn(args1.concat(args2))
    //         }
    //     }
    // }
    
    
    //
    // 给定两个数组，写一个方法来计算它们的交集。
    // 例如：给定 nums1 = [1, 2, 2, 1]，nums2 = [2, 2]，返回 [2, 2]。
    // let intersect = (nums1, nums2) => {
    //     nums1.sort((a, b) => a - b);
    //     nums2.sort((a, b) => a - b);
    //     let l = 0;
    //     let r = 0;
    //     let res = [];
    //     while (l < nums1.length && r < nums2.length) {
    //         if (nums1[l] === nums2[r]) {
    //             res.push(nums1[l]);
    //             l++;
    //             r++;
    //         } else {
    //             // 按照大小排顺序
    //             nums1[l] < nums2[r] ? l++ : r++;
    //         }
    //     }
    //     return res;
    // }
    
    // console.log(getInterSect([1, 2, 2, 1],[2, 2]))
    
    // 能简单说一下 Promise.all 的场景和返回结果吗
    
    
    
    
    var a = 1
    var obj = {
      a: 2,
      getA: () => {
        return this.a
      },
      getB: function(){
          return this.a
      }
    }
    console.log(obj.getA())
    
    // 1