import fs from 'node:fs'
import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import dayjs from 'dayjs'
import pkg from './package.json'
import createVitePlugins from './vite/plugins'

// https://vitejs.dev/config/
export default ({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  // 全局 scss 资源
  const scssResources = []
  fs.readdirSync('src/assets/styles/resources').forEach((dirname) => {
    // eslint-disable-next-line max-statements-per-line
    if (fs.statSync(`src/assets/styles/resources/${dirname}`).isFile()) { scssResources.push(`@use "src/assets/styles/resources/${dirname}" as *;`) }
  })
  // css 精灵图相关
  fs.readdirSync('src/assets/sprites').forEach((dirname) => {
    if (fs.statSync(`src/assets/sprites/${dirname}`).isDirectory()) {
      // css 精灵图生成的 scss 文件也需要放入全局 scss 资源
      scssResources.push(`@use "src/assets/sprites/_${dirname}.scss" as *;`)
    }
  })
  return defineConfig({
    base: './',
    // 开发服务器选项 https://cn.vitejs.dev/config/#server-options
    server: {
      // open: true,
      // port: 9000,
      // host: '10.198.131.25',
      host: '0.0.0.0',
      // https: false, // 是否开启 https
      open: false, // 是否自动在浏览器打开
      cors: true, // 允许跨域  8月更新
      port: 9000, // 端口号

      proxy: {
        '/proxy': {
          target: env.VITE_APP_API_BASEURL,
          changeOrigin: command === 'serve' && env.VITE_OPEN_PROXY === 'true',
          rewrite: path => path.replace(/\/proxy/, ''),
        },
      },
    },
    // 构建选项 https://cn.vitejs.dev/config/#server-fsserve-root
    build: {
      outDir: mode === 'production' ? 'dist' : `dist-${mode}`,
      sourcemap: env.VITE_BUILD_SOURCEMAP === 'true',
    },
    define: {
      __SYSTEM_INFO__: JSON.stringify({
        pkg: {
          version: pkg.version,
          dependencies: pkg.dependencies,
          devDependencies: pkg.devDependencies,
        },
        lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      }),
    },
    plugins: createVitePlugins(env, command === 'build'),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '#': path.resolve(__dirname, 'src/types'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: scssResources.join(''),
        },
      },
    },
  })
}
