/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-07-15 14:23:04
 * @LastEditors : wwj 318348750@qq.com
 * @LastEditTime: 2025-07-15 14:23:37
 * @Description : 
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
export const ObjectTool = {
  objectToURLChain(obj, withQuestionMark = true) {
    const params = Object.entries(obj || {})
      .filter(([_, v]) => v != null) // 过滤undefined和null值
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('&');
      
    return params ? `${withQuestionMark ? '?' : '&'}${params}` : '';
  }
  // ... 该对象可能包含其他工具方法 ...
}