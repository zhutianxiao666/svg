import '@/css/yingguangtiao.css';
import {yingguangtiao} from './common/myechars';
import {getTd} from "@/js/common/common";

setTimeout(function () {
    yingguangtiao({
        data:75,
        position: 'out',
        color:'yellow',
        $ele:getTd('report0','B1').find('.yingguangbao')
    });
},300)