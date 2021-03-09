import {Q_QArr} from "../common";
import {$svg} from "@/js/common/init";
// 有n条折线图
// data 为字符串 结构 日期Q_Q分类一Q_Q分类二
// order 为数组[‘分类一’，‘分类二’]
export default function ({$ele,data,order,x,y,width,height}) {
    const obj = {};
    // 处理数据
    data = typeof data == 'string' ? Q_QArr(data) : data;
    height = height || 100;
    // 处理$ele
    $ele = typeof $ele == 'string' ? $svg.find($ele) : $ele;
    if (!$ele[0]) {
        console.log('元素查询失败，请重新检查$ele',$ele);
        return;
    };
    // 求最大值最小值
    let min = Number(data[0][1]);
    let max = Number(data[0][1]);
    const widthSmall = width / (data.length - 1);
    data.forEach(value => {
        value.slice(1).forEach(value1 => {
            if (min > value1) {
                min = Number(value1);
            }else if (max < value1) {
                max = Number(value1);
            };
        });
    });
    const min_max = max - min;
    // 渲染path
    const pathArr = [];
    const pathFillArr = [];
    order.forEach(() => {
        pathArr.push([]);
        pathFillArr.push([]);
    })
    data.forEach((value,index) => {
        value.slice(1).forEach((value1,index1) => {
            console.log(index,data.length);
            // 首个
            if (index == 0) {
                pathArr[index1].push(`M${x},${y - (value1 - min) / min_max * height} L`);
                pathFillArr[index1].push(`M${x},${y - (0 - min) / min_max * height} L ${x},${y - (value1 - min) / min_max * height}`);
            } else {
                pathArr[index1].push(` ${x + widthSmall * index},${y - (value1 - min) / min_max * height}`);
                if (index == data.length - 1) {
                    pathFillArr[index1].push(` ${x + widthSmall * index},${y - (value1 - min) / min_max * height}  ${x + width},${y - (0 - min) / min_max * height} z`);
                }else {
                    pathFillArr[index1].push(` ${x + widthSmall * index},${y - (value1 - min) / min_max * height}`);
                }
            };
        });
    });
    // 拼接数组，产生path路径(这里面是d属性的数据 还需要你自己拼接到path中)
    order.forEach((value,index) => {
        console.log(pathArr[index].join(''));
        console.log('red',pathFillArr[index].join(''));
    });
};
