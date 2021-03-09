import {$svg} from "./init";
import {getTd, Q_QArr , textCenter} from "./common";
import zhexiantu from "./myechars/zhexiantu";
import yingguangtiao from "./myechars/yingguangtiao";
import zhuZhuangTu from "@/js/common/myechars/zhuZhuangTu";

// 条形图
const tiaoXinTu = function ({x,id,data,width,shift_group,length}) {
    // 获取元素
    const $ele = $svg.find('#' + id);
    data = data.map(function (value) {
        return value * 1  || 0;
    });
    // 求最大值
    const max = Math.max(...data) == 0 ? 100 : Math.max(...data);
    // 循环数组渲染数据
    data.forEach((value,index) => {
        value = (value && value * 1) ? value * 1 : 0;
        // 控制柱子宽度
        $ele.find(`.rect[data-index="${index}"]`).attr('width',value / max * width);
        // 控制数字
        $ele.find(`.num[data-index="${index}"]`).text(Number(value).toFixed(length || 2)).attr('x', x * 1 + value / max * width + 20);

    });
    // 修改班组
    let str = '';
    if (!shift_group) return;
    switch (shift_group.toUpperCase()) {
        case "A":
            str = '甲';
            break;
        case 'B':
            str = '乙';
            break;
        case 'C':
            str = '丙';
            break;
        case 'D':
            str = '丁';
            break;
    }
    $ele.find('.shift_group').text(str);
};

// 表格文字
const table = function ({width,data,titles,order,$ele}) {
    if (typeof $ele == 'string') {
        $ele = $($ele);
    };
    // 清除缓存
    $ele.find('.text,.title').text('');
    // 处理数据
    let list1 = [];
    if (typeof data === 'string') {
        list1 = Q_QArr(data)
    }else if (data instanceof Array) {
        list1 = data;
    }
    // 渲染标题
    const title= $ele.find('.title');
    let sum = 0;
    order.forEach(value => {
        sum += value;
    });
    const listTitle= [];
    let sum2 = 0;
    titles.forEach((value,index) => {
        order[index - 1] ? (sum2 += order[index - 1]) : '';
        listTitle.push(`<tspan fill="#0075D8" font-family="'微软雅黑'" font-size="32" x="${sum2 / sum * width}">${value}</tspan>`);
    });
    title.html(listTitle.join(''));
    // 渲染文本
    const textArr = $ele.find('.text');
    let num = 0;
    function doing() {
        list1.slice(num,num + textArr.length).forEach((value, index) => {
            let sum2 = 0;
            const list = [];
            value.forEach((value1, index1) => {
                if (index1 > 0) {
                    sum2 += order[index1 - 1];
                    list.push(`<tspan fill="#0075D8" font-family="'微软雅黑'" font-size="32" x="${sum2 / sum * width } ">|</tspan></tspan><tspan fill="#6E6E6E" font-family="'微软雅黑'" font-size="32" x="${sum2 / sum * width + 10 } ">${value1}</tspan>`);
                }else {
                    list.push(`<tspan fill="#6E6E6E" font-family="'微软雅黑'" font-size="32" x="10">${value1}</tspan>`);
                }
            });
            textArr.filter('[data-index="'+index+'"]').html(list.join(''));
        });
    };
    doing();
    // 换页
    $ele[0].onwheel = function (event) {
        if (event.deltaY < 0) {
            num -= textArr.length;
            if (num < 0 ) {
                num += textArr.length;
                return
            }else {
                doing();
            };
        }else if (event.deltaY > 0) {
            num += textArr.length;
            if (num > data.length - 1) {
                num -= textArr.length;
                return;
            }else {
                doing();
            };
        };
    };
};



// 环形图
const arc = function ({$ele,num1,num2,num,type,x,y,r}) {
    $ele = typeof $ele == 'string' ? $svg.find($ele) : $ele;
    if (!$ele[0]) {
        console.log($ele,'环形图容器元素查询失败');
        return
    };
    let str = '';
    // 渲染文本，并求出百分比
    if (type == 'double') {
        $ele.find('.num1').text(Number(num1).toFixed(2));
        $ele.find('.num2').text(Number(num2).toFixed(0));
        num = num1/num2 || 0;
        if (num > 1) {
            num = 1;
        }else if (num < 0) {
            num = 0;
        };
    }else {
        // 文本
        $ele.find('.num').text(Number(num).toFixed(2) + '%');
        num/=100;
        textCenter($ele.find('.num'));
        if (num<0) {
            num = 0;
        } else if (num > 1) {
            num = 1;
        }
    };
    if (num <= 0.5 ){
        str = `M${x},${y}a${r},${r},0,0,1,${(Math.sin(Math.PI * 2 * num) * r)},${r - Math.cos(Math.PI * 2 * num) * r}`
    } else if (num == 1) {
        str = `M${x},${y}a${r},${r},0,0,1,0,${2*r}a${r},${r},0,0,1,0,-${2*r}`

    } else {
        str = `M${x + ',' + y}a${r +','+ r},0,1,1,${Math.sin(Math.PI * 2 * num) * r},${r-Math.cos(Math.PI * 2 * num) * r}`
    };
    $ele.find('.path').attr('d',str);
};
// 双半圆
const doubleArc = function ({rIn,rOut,numIn,numOut,xIn,yIn,xOut,yOut,$ele,shift_group,length}) {
    if (typeof $ele == 'string') {
        $ele = $svg.find($ele);
    };
    length = length || 0;
    // 判断是否能找到元素
    if ($ele[0]){
        // 渲染文本
        $ele.find('tspan.in').text(Number(numIn).toFixed(length) + '%');
        $ele.find('tspan.out').text(Number(numOut).toFixed(length) + '%');
        textCenter($ele.find('tspan.in').parent());
        numIn = Number(numIn);
        numOut = Number(numOut);
        // 渲染光圈
        if (numIn < 0){
            numIn = 0;
        }else if (numIn > 100) {
            numIn = 100;
        };
        if (numOut < 0) {
            numOut = 0 ;
        }else if (numOut > 100) {
            numOut = 100;
        }
        numIn /= 100;
        numOut /= 100;
        let pathIn = `M${xIn},${yIn}a${rIn+','+rIn},0,0,1,${ rIn -  Math.cos(Math.PI * numIn) * rIn},${ - Math.sin(Math.PI * numIn) * rIn}`;
        let pathOut = `M${xOut},${yOut}a${rOut+','+rOut},0,0,1,${ rOut -  Math.cos(Math.PI * numOut) * rOut},${ - Math.sin(Math.PI * numOut) * rOut}`;
        $ele.find('path.in').attr('d',pathIn);
        $ele.find('path.out').attr('d',pathOut);
        // 渲染班组
        if (shift_group) {
            let str = shift_group;
            switch (shift_group.toUpperCase()) {
                case 'A':
                    str = '甲';
                    break;
                case 'B':
                    str = '乙';
                    break;
                case 'C':
                    str = '丙';
                    break;
                case 'D':
                    str = '丁';
                    break;
            };
            $ele.find('.shift_group').text(str);
        }
    } else {
        console.log($ele,'元素查询不到');
    };
};
const banYuan = function ({x,y,numTop,r,numBottom,$ele}) {
    if (typeof $ele == 'string') {
        $ele = $svg.find($ele);
    };
    if ($ele[0]) {
        // 文本
        $ele.find('.numTop').text(Number(numTop).toFixed(2) + '%');
        $ele.find('.numBottom').text(Number(numBottom).toFixed(2));
        textCenter($ele.find('.numTop').parent());
        // 图形
        numTop = numTop / 100 > 1 ? 1 : numTop / 100;
        let str = `M${x+','+y},a${r +','+ r},0,0,1,${r-Math.cos(Math.PI*numTop) * r},${-Math.sin(Math.PI*numTop) * r}`;
        $ele.find('.path').attr('d',str);
    } else {
        console.log($ele,'半圆查询失败');
    };
};
const changeText = function ({$ele,reportName,tdId,length,type}) {
    // 判断数据类型
    length = length || 0;
    let data = getTd(reportName,tdId).text();
    type = type || 'number';
    switch (type.toLowerCase()) {
        case 'string':
            data = data.trim();
            break;
        case '%':
            data = Number(data).toFixed(length) + '%';
            break;
        case '100%':
            data = data * 100 .toFixed(2) + '%';
            break;
        case 'number':
            data = Number(data).toFixed(length);
            break;
        default:
            console.log(type,'changeText数据类型查询失败');
            return;
    };
    if (typeof $ele == 'string') {
        $ele = $svg.find($ele);
    }
    if (!$ele[0]) {
        console.log($ele , '元素查询失败');
        return;
    }
    if (!!$ele.find('.text')[0]){
        $ele.find('.text').text(data);
    }else {
        $ele.text(data);
    }
};
const bingTu = function ({$ele,data,order,rIn,rOut,color,x,y}) {
    $ele = typeof $ele == 'string' ? $svg.find($ele) : $ele;
    if (!$ele[0]) {
        console.log($ele,'环形图元素查询失败');
        return;
    };
    if (typeof data == 'string') data = Q_QArr(data);
    // 渲染圆环
    let sum = 0;
    let sum2 = 0;
    let pathArr = []
    // 求和
    data = data.map(value => {
        value *= 1;
        sum += value;
        return value;
    });
    data.forEach((value,index) => {
        if (value / sum < 0.5) {
            pathArr.push(`<path d="M${x - rOut + rOut * Math.cos(Math.PI * 2 * sum2 / sum )},${y - Math.sin(Math.PI * 2 * sum2 / sum) * rOut},A${rOut+','+rOut},0,0,0,${x - rOut + rOut * Math.cos(Math.PI * 2 * (sum2 + value) / sum )},${y - Math.sin(Math.PI * 2 * (sum2 + value) / sum) * rOut},L${x - rOut},${y} Z" fill="${color[index]} "></path>`);
        } else {
            pathArr.push(`<path d="M${x - rOut + rOut * Math.cos(Math.PI * 2 * sum2 / sum )},${y - Math.sin(Math.PI * 2 * sum2 / sum) * rOut},A${rOut+','+rOut},0,1,0,${x - rOut + rOut * Math.cos(Math.PI * 2 * (sum2 + value) / sum )},${y - Math.sin(Math.PI * 2 * (sum2 + value) / sum) * rOut},L${x - rOut},${y} Z" fill="${color[index]} "></path>`);
        }
        sum2 += value;
    });
    if (rIn) {
        pathArr.push(`<circle r="${rIn}" cx="${x - rOut}" cy="${y}" fill="white"></circle>`);
    }
    $ele.find('.path').html(pathArr.join(''));
};
const tiaoXingDuiJi = function (obj) {
    // 获取元素
    const $ele = $svg.find('#' + obj.id);
    obj.data = obj.data.map(function (value) {
        return value.map(function (value) {
            return value * 1  || 0;
        })
    })
    // 求最大值
    const max = Math.max(...obj.total) == 0 ? 100 : Math.max(...obj.total);
    // 循环数组渲染数据
    obj.data.forEach((value,index) => {
        // 控制柱子宽度
        $ele.find(`.rect[data-index="${index}"][order="0"]`).attr('width',value[0] / max * obj.width);
        $ele.find(`.rect[data-index="${index}"][order="1"]`).attr('x',($ele.find(`.rect[data-index="${index}"][order="0"]`).attr('x') * 1 + value[0] / max * obj.width));
        $ele.find(`.rect[data-index="${index}"][order="1"]`).attr('width',value[1] / max * obj.width);
        // 控制数字
        $ele.find(`.num[data-index="${index}"][order="0"]`).text(Number(value[0]).toFixed(obj.length || 2)).attr('x',obj.x * 1 + value[0] / max * obj.width + value[1] / max * obj.width + 20);
        $ele.find(`.num[data-index="${index}"][order="1"]`).text(Number(value[1]).toFixed(obj.length || 2)).attr('x',obj.x * 1 + value[0] / max * obj.width + value[1] / max * obj.width + 30 + $ele.find(`.num[data-index="${index}"][order="0"]`)[0].getBBox().width);

    });
    // 修改班组
    if (obj.shift_group) {
        let str = obj.shift_group;
        switch (obj.shift_group.toUpperCase()) {
            case 'A':
                str = '甲';
                break;
            case 'B':
                str = '乙';
                break;
            case 'C':
                str = '丙';
                break;
            case 'D':
                str = '丁';
                break;

        };
        $ele.find('.shift_group').text(str);
    }
};
export {
    tiaoXinTu,
    zhuZhuangTu,
    table,
    arc,
    doubleArc,
    banYuan,
    changeText,
    bingTu,
    zhexiantu,
    yingguangtiao,
    tiaoXingDuiJi
}