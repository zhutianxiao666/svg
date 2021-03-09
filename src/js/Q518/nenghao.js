import {tiaoXinTu} from "../common/myechars";
import {getData} from "@/js/common/common";

export default function () {
    // 早班
    tiaoXinTu({
        x:2522.767,
        id:'zaobannenghao_2_',
        data:[getData('report1','B49'),getData('report1','C49')],
        width:461.277
    });
    // 晚班
    tiaoXinTu({
        x:2522.767,
        id:'wanbannenghao_2_',
        data:[getData('report1','B50'),getData('report1','C50')],
        width:461.277
    });
}