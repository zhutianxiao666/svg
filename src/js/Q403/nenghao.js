import {tiaoXinTu,tiaoXingDuiJi} from "../common/myechars";
import {getTd, getArr, textCenter, getUnitCode} from "../common/common";
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
            data: [
                [
                    getTd('report1','C33').text()/1000,
                    getTd('report1','B33').text()/1000
                ],
                [
                    getTd('report1','C34').text(),
                    getTd('report1','B34').text()
                ]
            ],
            total: [
                getTd('report1','E33').text()/1000,
                getTd('report1','E34').text()/1000
            ],
            width: 626.242,
            x: 2350.791
        }
        tiaoXinTu(zaobannenghao);
        tiaoXinTu(wanbannenghao);
        tiaoXingDuiJi(tianranqizhengqi);
        $svg.find('#dungangnenghao').click(function () {
            FR.doHyperlink(event||window.event, [{"data":`var as=arguments; return FR.tc(function(){FR.doHyperlinkByGet4Reportlet({"url":"/webroot/decision/view/form?viewlet=%252F%25E7%25A1%2585%25E9%2592%25A2%252F%25E5%25BC%25B9%25E5%2587%25BA%25E6%2598%258E%25E7%25BB%2586%252F%25E8%2583%25BD%25E8%2580%2597%25E8%25B6%258B%25E5%258A%25BF.frm","para":{"__pi__":true,"unit_code":"${getUnitCode('Q413')}"},"target":"_dialog","feature":{"width":1800,"height":1000,"isCenter":true,"title":""},"title":"网络报表1"})}, this, as)`,"name":"网络报表1"}], true)
        })
    })();
}