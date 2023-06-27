/**
 * @name configManualChunk
 * @description chunk 拆包优化
 */

const vendorLibs: { match: string[]; output: string }[] = [
  {
    match: ['echarts'],
    output: 'echarts'
  },
  { match: ['vue-router'], output: 'vue-router' },
  { match: ['vue'], output: 'vue' },
  { match: ['dayjs'], output: 'dayjs' },
  { match: ['vuex'], output: 'vuex' },
  { match: ['axios'], output: 'axios' }
]

// pnpm安装的依赖，获取到的路径名称是拼接而成且比较长的
export const configManualChunk = (id: string) => {
  if (/[\\/]node_modules[\\/]/.test(id)) {
    const matchItem = vendorLibs.find((item) => {
      const reg = new RegExp(`[\\/]node_modules[\\/]_?(${item.match.join('|')})(.*)`, 'ig')
      return reg.test(id)
    })
    return matchItem ? matchItem.output : null
  }
}
