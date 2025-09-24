/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-06-23 13:49:47
 * @LastEditors : wwj 318348750@qq.com
 * @LastEditTime: 2025-06-24 13:55:28
 * @Description : 通用接口
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
import type { ApiModuleParams } from 'src/types/request'

type ApiModuleReturn = {
  getStaticData: (fetchStr: string, baseURL?: string) => Promise<unknown>;
  getLocationList: (query: object) => Promise<unknown>;
}

const apiModule: (params: ApiModuleParams) => ApiModuleReturn = ({ request }) => ({
  getStaticData(fetchStr: string, baseURL?: string) {
    baseURL = baseURL || import.meta.env.BASE_URL
    const res = request({
      baseURL,
      url: fetchStr,
      method: 'get'
    })
    return res.then(data => {
      return {
        code: 0,
        data: data,
        msg: 'success'
      }
    })
  },

  getLocationList(query) {
    return request({
      baseURL: import.meta.env.BASE_URL,
      url: '/v3/place/text',
      method: 'get',
      params: query
    })
  }
})

export default apiModule
