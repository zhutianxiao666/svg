export default function (cd,long) {
    let timer = null;

    return function() {
        clearTimeout(timer);
        timer = setTimeout(function () {
            cd();
        },long)
    }

}