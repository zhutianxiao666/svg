export default function (obj) {
    const queryObj = {};
    for (let k in obj) {
        if (k == 'order' || k == 'title') {
            queryObj[k] = JSON.stringify(obj[k]);
        }else {
            queryObj[k] = obj[k];
        }
    };
    let width = 900,height = 600;

    if (document.body.clientWidth > 3000) {
        width = 1500;
        height = 1000
    }
    FR.doHyperlink(event||window.event, [{"data":`var as=arguments; return FR.tc(function(){FR.doHyperlinkByGet({"url":"http://10.70.16.168:37799/webroot/decision/view/form?viewlet=%25E7%25A1%2585%25E9%2592%25A2%252F%25E5%25BC%25B9%25E5%2587%25BA%25E6%2598%258E%25E7%25BB%2586%252F%25E8%25A1%25A8%25E5%258D%2595%25E6%2598%258E%25E7%25BB%2586.frm&ref_t=design&ref_c=e6feee1c-7c77-46c6-8000-a6f37ab0ccc0","para":${JSON.stringify(queryObj)},"target":"_dialog","feature":"width=${width},height=${height},","title":"网页链接1"})}, this, as)`,"name":"网页链接1"}], true)
}