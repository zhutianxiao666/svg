
import {getTd} from "../common/common";
import {doubleArc} from "../common/myechars";
export default function () {
    // 早班
    doubleArc({
        rIn:158.6,
        rOut:194.271,
        numIn:Number(getTd('report1','B22').text()),
        numOut:Number(getTd('report1','C22').text()),
        xIn:2264.622,
        yIn:372.451,
        xOut:2228.958,
        yOut:374.147,
        $ele:'#zaobanchengcailv_2_',
        shift_group:getTd('report1','A22').text(),
        length:2
    })
    // 晚班
    doubleArc({
        rIn:158.6,
        rOut:194.271,
        numIn:Number(getTd('report1','B25').text()),
        numOut:Number(getTd('report1','C25').text()),
        xIn:2264.622,
        yIn:721.405,
        xOut:2228.958,
        yOut:723.103,
        $ele:'#wanbanchengcailv_1_',
        shift_group:getTd('report1','A25').text(),
        length:2
    });
    //

}