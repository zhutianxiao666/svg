import {getTd} from "./common";

let $svg = {}
const init = function ({reportName,tdId,id}) {
    const $svgDom = $(document.querySelector('embed#'+id).getSVGDocument().querySelector('svg'));
    const $td = getTd(reportName,tdId);
    const width = $td.width();
    const height = $td.height();

    $td.html($svgDom);
    $svg = $td.find('svg');
    $svg.attr({
        width,
        height
    });
    // const svg = $('<svg width="300" height="300" style="background-color: rgba(0,0,0,.2);position: absolute;top: 0;left: 0" id="testSize"></svg>')
    // $('body').append(svg);
    // window.onresize = function () {
    //     const width = window.innerWidth;
    //     const height = window.innerHeight;
    //     $('#testSize').attr({
    //         width,
    //         height
    //     })
    // }

};
export {
    $svg,
    init
}
