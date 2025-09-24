// 公共方法
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



