// function MVVM(obj) {
//     this.obj = obj;
//     const me = this;
//     const data = me._data = this.obj.data;
//     // 数据代理
//     Object.keys(data).forEach(key => {
//
//     })
// };
// class MVVM {
//     constructor(name) {
//         this.name = name;
//         this.init();
//     }
//     init() {
//         console.log(this.name)
//     }
// };
// const v1 = new MVVM({
//     name:'ztx'
// });
// const v2 = new MVVM({
//     name:'zzz'
// });
// console.log(v1.init == v2.init);


function MVVM(name) {
    this.name = name
    // this.say = function () {
    //     console.log(name)
    // }
};
MVVM.prototype.say = function () {
    console.log(this.name)
}
const v1 = new MVVM('ztx');
const v2 = new MVVM('zzz');
console.log(v1.say == v2.say);
