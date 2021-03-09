import {changeText} from "../common/myechars";
import {$svg} from "../common/init";
import mingxi from "../common/mingxi";
import {getUnitCode} from "../common/common";
import jiangsu from "@/js/Q518/shebei/jiangsu";

export default function () {
    // 停机次数
    changeText({$ele:'#zhengtitingjicishu',reportName:'report1',tdId:'A43',length:0,type:'number'});
    // 停机时间
    changeText({$ele:'#zhengtitingjishijian',reportName:'report1',tdId:'B43',length:0,type:'number'});
    // 故障停机次数
    changeText({$ele:'#guzhangtingjicishu',reportName:'report1',tdId:'A46',length:0,type:'number'});
    // 故障停机时间
    changeText({$ele:'#guzhangtingjishijian',reportName:'report1',tdId:'B46',length:0,type:'number'});
    // 停机
    $svg.find('#tingjicishu_1_').click(function () {
        mingxi({
            system:'DBPRODE7',
            sqlStr:`
SELECT
unit_code||'Q_Q'||
sd_start||'Q_Q'||
sd_end||'Q_Q'||
subtotal||'Q_Q'||
sd_description||'Q_Q'||
rs_description||'Q_Q'||
sd_type||'Q_Q'||
sd_time||'Q_Q'||
attribute||'Q_Q'||
id||'Q_Q'||
spare_time_1||'-*-' as 明细
FROM ttmsij4ps
WHERE SUBSTR(SD_DATE,1,6) = to_char(current date,'yyyymm')
AND UNIT_CODE = '${getUnitCode() || 'Q518'}'
AND SD_DESCRIPTION = '成品卷停机'`,
            order:[1,1,1,1,1,1,1,1,1,1,1],
            title:['机组代码','停机开始','停机结束','小计','简述','原因简述','停机类型','停机时间','专业属性','序号','备用时间'],
            width:150
        });
    });
    // 明细按钮
    $svg.find('#tingji .mingxi').click(function () {
        mingxi({
            system:'DBPRODE7',
            sqlStr:`
select 
A.MAT_NO ||'Q_Q'|| 
B.PROD_END_TIME ||'Q_Q'|| 
B.SG_SIGN ||'Q_Q'|| 
DECODE(B.SHIFT_GROUP,'A','甲','B','乙','C','丙','D','丁') ||'Q_Q'||
DECODE(B.SHIFT_NO,'2','白班','1','夜班','') ||'-*-' item 
from IMSIJ4.TIMSIJ4LG A,MMSIJ4.TMMSIJ402 B 
where A.JUDGE_RULE_CODE = 'Q518001_A0' 
AND A.RESULT_CODE='0' 
AND A.UNIT_CODE = '${getUnitCode('Q518')}' 
AND A.MAT_NO = B.OUT_MAT_NO 
AND A.UNIT_CODE = B.UNIT_CODE 
AND B.PROD_END_TIME > to_char(last_day(sysdate - 1 month),'yyyymmdd' )||'220000'`,
            order:[1,1,1,1,1],
            title:['材料号','时间','牌号','班组','班次'],
            width:100
        });
    });
    // 降速
    jiangsu();

};