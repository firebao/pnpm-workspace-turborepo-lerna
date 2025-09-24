/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-07-14 18:01:15
 * @LastEditors : wwj 318348750@qq.com
 * @LastEditTime: 2025-07-15 14:10:33
 * @Description : 
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
// import Redtheme from '@/styles/theme-red.json';
// import Greentheme from '@/styles/theme-green.json';
// import Bluetheme from '@/styles/theme-blue.json';
// import Goldtheme from '@/styles/theme-gold.json';
export function setTheme (themeName){
    let themeObjs = {
        // red:Redtheme,
        // green:Greentheme,
        // blue:Bluetheme,
        // gold:Goldtheme
        red: {},
        green: {},
        blue: {},
        gold: {}
    };
    const theme = themeObjs[themeName];
    for(const key in theme){
        document.documentElement.style.setProperty(key,theme[key]);
    }
    localStorage.setItem('theme',themeName)
    sgBroewserSetLeftcolor(theme['--BOM-left-color'])
    // sgBroewserSetTopcolor(theme['--BOM-top-color'])
    sgBroewserSetTopcolor(theme['--BOM-top-color'],theme['--BOM-top-font-color'])
}
