export const methods = {
    // 双半圆环形图
    // obj中输入 rOut rIn xOut xIn yOut yIn， pathOut pathIn ，numOut numIn (num统一为0-1的数字)，textOut textIn
    doubleArc(obj) {
        function f(obj) {
            if (obj.num > 1) {
                return `M${obj.x},${obj.y} a${obj.r},${obj.r} 0 0,1 ${obj.r * 2} , 0  `
            }else if (obj.num <= 0 ) {
                return `M${obj.x},${obj.y} a${obj.r},${obj.r} 0 0,1 0,0  `
            }else {
                return `M${obj.x},${obj.y} a${obj.r},${obj.r} 0 0,1 ${obj.r * 1 - Math.cos(Math.PI * obj.num) * obj.r } , -${Math.sin(Math.PI * obj.num) * obj.r } `
            }
        };
        obj.textOut.text(parseInt(obj.numOut * 100) + '%');
        obj.textIn.text(parseInt(obj.numIn * 100) + '%');

        obj.pathOut.attr('d',f({
            num:obj.numOut,
            x:obj.xOut,
            y:obj.yOut,
            r:obj.rOut
        }));
        obj.pathIn.attr('d',f({
            num:obj.numIn,
            x:obj.xIn,
            y:obj.yIn,
            r:obj.rIn
        }));
        // 处理文字
        this.textCenter({textSvg:obj.textOut,x:obj.xOut,r:obj.rOut});
        this.textCenter({textSvg:obj.textIn,x:obj.xIn,r:obj.rIn});
    },
    // 单圆环 需要传入 r x y num path
    arc(obj) {
        let d = ''
        if (obj.num >= 1 ) {
            d = `M${obj.x},${obj.y} a${obj.r},${obj.r} 0 0,1 0,${obj.r * 2} a${obj.r},${obj.r} 0 0,1 0, -${obj.r * 2} `;
        }else if (obj.num <= 0 ) {
            d = `M${obj.x},${obj.y} a${obj.r},${obj.r} 0 0,1 0,0`;
        }else if (obj.num <= 0.5){
            d = `M${obj.x},${obj.y} a${obj.r},${obj.r} 0 0,1   ${ Math.sin(Math.PI * 2 * obj.num) * obj.r }  , ${obj.r - Math.cos(Math.PI * 2 * obj.num) * obj.r} `;
        }else if (obj.num > 0.5) {
            d = `M${obj.x},${obj.y} a${obj.r},${obj.r} 0 1,1   ${ Math.sin(Math.PI * 2 * obj.num) * obj.r }  , ${obj.r - Math.cos(Math.PI * 2 * obj.num) * obj.r} `;
        };
        obj.path.attr('d',d);
        this.textCenter({textSvg:$('text').eq(2),x:obj.x,r:obj.r});
        console.log($('text').eq(2));
    },
    // 传入 width height x y num  divX divY
    histogram(obj) {

    },
    // x text r
    textCenter(obj){
        const width = obj.textSvg[0].getBBox().width;
        obj.textSvg.attr('x',obj.x * 1 + obj.r * 1  - width / 2 );
    },

    say() {
        console.log('ok')
    }

}

