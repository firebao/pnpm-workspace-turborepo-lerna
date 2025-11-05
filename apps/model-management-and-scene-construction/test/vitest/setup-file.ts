// This file will be run before each test file
// 在全局作用域中定义__APP_VERSION__变量
// @ts-expect-error xxx
globalThis.__APP_VERSION__ = '1.0.0'
// @ts-expect-error xxx
global._APP_VERSION__ = '1.0.0'

try {
  if (process && process.env) {
    process.env.__APP_VERSION__ = '1.0.0'
  }
} catch (e) {
  console.log('测试环境变量出错了', e)
}
