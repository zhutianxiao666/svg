import {Q_QArr, Q_QObj, textCenter} from "@/js/common/common";
import {$svg} from "@/js/common/init";

export default  function ({margin,order1,order2,width,data,x,y,height,color,textY,$ele,dataType}) {
    margin = margin || 0.3;
    const length1 = order1.length ;                                 // 分类1
    const length2 = order2.length ;                                 // 分类2
    const width0 = width / ( length1 + margin);                     // 每个分取的宽度（包含左右边距）
    const width1 = width0 * (1 - margin);                           // 区域宽度（不包含左右边距）
    const width2 = width1 * ( length2 > 1 ? 0.7 : 1 ) / length2  ;  // 柱子的实际宽度
    const margin1 = width0 * margin ;                               // 大边距
    const margin2 = length2 >1 ? width1 * 0.3 / (length2 - 1) : 0;  // 小边距
    const list = [];
    // 循环数组
    const rectArr = [];
    if (dataType == '竖表') {
        const {obj : objData,max} =  Q_QObj(data);

        order1.forEach((value,index) => {
            let str = '<g>'
            order2.forEach((value1, index1) => {
                console.log(value,value1,'--------');
                str += `<g>
                            <rect x="${x + index  * width0 + margin1 + index1 * width2 + index1 * margin2}" y="${y - (objData[value][value1] || 0 ) / max * height}" width="${width2}" height="${(objData[value][value1] || 0) / max * height}" fill="${color[index1]}" data-stock-no="${value}" data-st-no="${value1}" class="hover"></rect>                    
                            <text x="${x + index  * width0 + margin1 + index1 * width2 + index1 * margin2 + width2 / 2}" y="${y - (objData[value][value1] || 0) / max * height - 10 }" font-size="28.8" style="font-family: 'AgencyFB-Reg'" data-stock-no="${value}" data-st-no="${value1}" class="hover">${ objData[value][value1] ? Number(objData[value][value1] ).toFixed(2) : 0}</text>
                        </g>`
            });
            str += `
               <g>
                    <rect x="${margin1 + index * width0 +x}" y="${textY - 48  }" width="${width1}" height="50" fill="#036EB8" ></rect>
                    <text x="${margin1 + width1 / 2 + index * width0 + x}" y="${textY}" font-family="AgencyFB-Reg" font-size="48" fill="white">${order1[index]}</text>
                </g>
            </g>`;
            rectArr.push(str);
        });

    }else {
        data = typeof data == 'string' ? Q_QArr(data) : data;
        data.forEach(value => {
            list.push(...value);
        });
        const max = Math.max(...list);

        data.forEach((value , index) => {
            let str = '<g>';
            value.forEach((value1 , index1) => {
                str += `<g>
                            <rect x="${x + index  * width0 + margin1 + index1 * width2 + index1 * margin2}" y="${y - value1 / max * height}" width="${width2}" height="${value1 / max * height}" fill="${color[index1]}" data-stock-no="${order1[index]}" data-st-no="${order2[index1]}" class="hover">
                            </rect>
                            <text x="${x + index  * width0 + margin1 + index1 * width2 + index1 * margin2 + width2 / 2}" y="${y - value1 / max * height - 10 }" font-size="28.8" style="font-family: 'AgencyFB-Reg'" data-stock-no="${order1[index]}" data-st-no="${order2[index1]}" class="hover" >${Number(value1).toFixed(2)}</text>
                   </g>`;
            });
            str += `
            <g>
                <rect x="${margin1 + index * width0 +x}" y="${textY - 48  }" width="${width1}" height="50" fill="#036EB8" ></rect>
                <text x="${margin1 + width1 / 2 + index * width0 + x}" y="${textY}" font-family="AgencyFB-Reg" font-size="48" fill="white">${order1[index]}</text>
            </g>
        </g>`;
            rectArr.push(str);
        });
    }
    if (typeof $ele == 'string') {
        $ele = $svg.find($ele);
    };

    if ($ele[0]) {
        $ele.html(rectArr.join(''))
    };
    $ele.find('text').each((index ,value ) => {
        textCenter($(value));
    });
};
