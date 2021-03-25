window.f1 = function () {
    const js =  document.createElement('script');
    //
    js.src = 'js文件的实际路径';
    document.querySelector('body').append(js);
}