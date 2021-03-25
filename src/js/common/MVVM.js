const MVVM = function (obj) {

    const data = this._data = obj.data;
    const me = this;
    Object.keys(data).forEach(key => {
        this.f1(key,data[key])
    });
    console.log(this)
};
MVVM.prototype.f1 = function (key,value) {
    Object.defineProperty(this,key,{
        get() {
            return this._data[key]
        },
        set(v) {
            this._data[key] = value
        }
    })
}

new MVVM({
    data: {
        name:'ztx'
    }
})
// export default MVVM
