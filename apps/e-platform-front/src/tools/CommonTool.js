export default class CommonTool {
    static  debounce(func, delay) {
        let timeoutId;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(context, args);
            }, delay);
        };
    }

}

export const hexToRgbMixin = {
    methods: {
        hexToRgb(hex) {
            let sanitizedHex = hex.replace('#', '');
            let r = parseInt(sanitizedHex.substring(0, 2), 16);
            let g = parseInt(sanitizedHex.substring(2, 4), 16);
            let b = parseInt(sanitizedHex.substring(4, 6), 16);
            let a = 0.1;
            return `rgb(${r}, ${g}, ${b}, ${a})`;
        }
    }
};

export function convertToThousand(val) {
  return (val / 10000).toFixed(2)
};

// 防抖
export const Throttle = (fn, delay = 1000) => {
    //距离上一次的执行时间
    let lastTime = 0;
    return function () {
        let now = new Date().getTime();
        //如果距离上一次执行超过了delay才能再次执行
        if (now - lastTime > delay) {
            fn.apply(this, arguments);
            lastTime = now;
        }
    };
};

// 去重
export function removeDuplicateById(array, id) {
    return array.reduce((acc, current) => {
        const x = acc.find(item => item[id] === current[id]);
        if (!x) {
            return acc.concat([current]);
        } else {
            return acc;
        }
    }, []);
}


