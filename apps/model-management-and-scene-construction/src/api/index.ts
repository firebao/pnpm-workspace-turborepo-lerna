/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-06-23 13:49:47
 * @LastEditors : wwj 318348750@qq.com
 * @LastEditTime: 2025-06-24 17:53:53
 * @Description : API
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
import { request, requestForMock, mock } from './service'
import * as tools from './tools'
import systemApi from './modules/system'
import commonApi from './modules/common'

const params = { request, requestForMock, mock, tools }
const system = systemApi(params)
const common = commonApi(params)

export { system, common }
