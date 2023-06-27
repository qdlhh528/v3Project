import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { fileURLToPath, URL } from 'node:url'
import { ConfigEnv, defineConfig, loadEnv, UserConfig } from 'vite'
import { VITE_DROP_CONSOLE, VITE_DROP_DEBUGGER, VITE_PORT } from './config/constant'
import { configManualChunk } from './config/vite/optimizer'
import proxy from './config/vite/proxy'

const Timestamp = new Date().getTime()

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build'
  const env = loadEnv(mode, process.cwd())
  console.log(env, 'env')
  return {
    plugins: [vue(), vueJsx()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    base: env.VITE_BASE_PATH,
    // server
    server: {
      https: false, //是否开启https
      hmr: { overlay: false }, // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
      // 服务配置
      port: VITE_PORT, // 类型： number 指定服务器端口;
      open: true, // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
      cors: true, // 类型： boolean | CorsOptions 为开发服务器配置 CORS,是否允许跨域。默认启用并允许任何源
      proxy
    },

    // build
    build: {
      // 设置最终构建的浏览器兼容目标
      target: 'esnext',
      // 构建后是否生成source map文件
      sourcemap: false,
      assetsInlineLimit: 2048, //静态资源内联为 base64 编码的阈值，以字节为单位
      cssCodeSplit: true, // 如果为false,整个项目中的所有css将被提取到一个css文件中。
      minify: 'terser',
      terserOptions: {
        compress: {
          keep_infinity: false,
          // 删除生产的console.log,debugger
          drop_console: VITE_DROP_CONSOLE,
          drop_debugger: VITE_DROP_DEBUGGER
        }
      },
      rollupOptions: {
        // external: ['echarts'],
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: `static/js/app-[hash]-${Timestamp}.js`,
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks: configManualChunk
        }
      },
      // 启用/禁用 gzip压缩大小报告
      reportCompressedSize: true,
      // chunk 大小警告的限制（以kbs为单位）
      chunkSizeWarningLimit: 2000
    }
  }
})
