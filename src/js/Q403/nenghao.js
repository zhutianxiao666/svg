import {tiaoXinTu,tiaoXingDuiJi} from "../common/myechars";
import {getTd,getArr,textCenter} from "../common/common";
import {$svg} from "../common/init";
export default  function () {
    // 吨钢能耗
    (function () {
        // 早班
        const zaobannenghao = {
            'id':'zaobannenghao',
            data: [getTd('report1','B31').text(),getTd('report1','C31').text()],
            shift_group: getTd('report1','D31').text(),
            width: 461.277,
            x: 2502.755
        }
        // 晚班
        const wanbannenghao = {
            'id':'wanbannenghao',
            data: [getTd('report1','B32').text(),getTd('report1','C32').text()],
            shift_group: getTd('report1','D32').text(),
            width: 461.277,
            x: 2502.755
        }
        const tianranqizhengqi = {
            'id':'tianranqizhengqi',
            data: [getTd('report1','B33').text(),getTd('report1','C33').text()],
            width: 726.242,
            x: 2237.791
        }
        tiaoXinTu(zaobannenghao);
        tiaoXinTu(wanbannenghao);
        tiaoXinTu(tianranqizhengqi);
    })();
}