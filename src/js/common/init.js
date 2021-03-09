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

};
export {
    $svg,
    init
}
