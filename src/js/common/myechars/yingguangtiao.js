
export default function ({data,position,color,$ele}) {
    // 获取$sle
    $ele = typeof $ele == 'string' ? $($ele) : $ele;
    console.log($ele)
    if (!$ele[0]) {
        console.log('元素查询失败，请重新查看$ele是否规范');
        return;
    };
    const list = [];
    for (let i = 0 ; i < 25 ;i++) {
        if (i / 25 * 100 < data) {
            list.push(`<li style="background-color: ${color}"></li>`);
        }else {
            list.push(`<li></li>`);
        }
    };
    console.log(list)
    $ele.find('ul').html(list.join(''));
    $ele.css('border-color',color);
};