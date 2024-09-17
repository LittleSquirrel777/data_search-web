<route lang="yaml">
name: home
meta:
  title: 主页
</route>

<script lang="ts" setup>

import { onMounted } from 'vue'
import { init } from 'echarts'
import moment from 'moment'
import { reqGetDataNodeInfo } from '@/api'

const data: Array<any> = []
const data1: Array<String> = []
const data2: Array<number> = []
const data3: Array<number> = []

async function getNodeInfo() {
  let result = {
    totalAlive: '',
    utilization: '',
  }
  result = await reqGetDataNodeInfo()
  data1.push(moment().format('hh:mm:ss'))
  data2.push(Number(result.totalAlive))
  data3.push(Number(result.utilization))
  // console.log(data1)
  // console.log(data2)
}
function drawChart1(data1, data2) {
  // 使用里面的配置项和数据显示图表。
  const chartEle1: HTMLElement = document.getElementById('chart1') as HTMLElement
  const chart1 = init(chartEle1)
  const option1: {
    yAxis: {
      lineStyle: { color: string; width: number; type: string }
      max: number
      name: string
      show: boolean
      type: string
    }[]
    xAxis: { data: any[]; type: string }
    color: string
    legend: { data: string[] }
    grid: { containLabel: boolean }
    series: {
      areaStyle: {}
      data: any[]
      lineStyle: { width: number; type: string }
      name: string
      type: string
      yAxisIndex: number
    }[]
    tooltip: { trigger: string }
    title: { text: string }
  } = {
    // 图表标题
    title: {
      text: '结点状况',
    },
    color: '#3232CD',
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['结点数量'],
    },
    grid: {
      containLabel: true,
    },
    // toolbox: {
    //   feature: {
    //     saveAsImage: {},
    //   },
    // },
    xAxis: {
      type: 'category',
      data: [],
    },
    yAxis: [
      {
        name: '结点数量',
        type: 'value',
        max: 5,
        show: true,
        lineStyle: {
          color: 'black',
          width: 2,
          type: 'solid',
        },
      },
    ],
    series: [
      {
        name: '结点数量',
        type: 'line',
        yAxisIndex: 0, // 右轴
        data: [],
        lineStyle: {
          width: 2,
          type: 'solid',
        },
        areaStyle: {},
      },
    ],
  }
  option1.xAxis.data = data1
  option1.series[0].data = data2
  option1 && chart1.setOption(option1)
}
function drawChart2(data1, data3) {
  const chartEle2: HTMLElement = document.getElementById('chart2') as HTMLElement
  const chart2 = init(chartEle2)
  const option2: {
    yAxis: {
      areaStyle: {}
      lineStyle: { color: string; width: number; type: string }
      max: number
      name: string
      show: boolean
      type: string
    }[]
    xAxis: { data: any[]; type: string }
    color: string
    legend: { data: string[] }
    grid: { containLabel: boolean }
    series: {
      data: any[]
      lineStyle: { width: number; type: string }
      name: string
      type: string
      yAxisIndex: number
    }[]
    tooltip: { trigger: string }
    title: { text: string }
  } = {
    title: {
      text: '存储利用率',
    },
    color: '#3232CD',
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['利用率'],
    },
    grid: {
      containLabel: true,
    },
    // toolbox: {
    //   feature: {
    //     saveAsImage: {},
    //   },
    // },
    xAxis: {
      type: 'category',
      data: [],
    },
    yAxis: [
      {
        name: '利用率',
        type: 'value',
        max: 1,
        show: true,
        lineStyle: {
          color: 'black',
          width: 2,
          type: 'solid',
        },
        areaStyle: {},
      },
    ],
    series: [
      {
        name: '利用率',
        type: 'line',
        yAxisIndex: 0, // 右轴
        data: [],
        lineStyle: {
          width: 2,
          type: 'solid',
        },
      },
    ],
  }
  option2.xAxis.data = data1
  option2.series[0].data = data3
  option2 && chart2.setOption(option2)
}
onMounted(() => {
  let timer = null
  // 每5s刷新数据
  timer = setInterval(() => {
    getNodeInfo()
    if (data1.length > 5) {
      data1.splice(0, 1)
    }
    if (data2.length > 5) {
      data2.splice(0, 1)
    }
    if (data3.length > 5) {
      data3.splice(0, 1)
    }
    // 获取dom元素,图表初始化
    drawChart1(data1, data2)
    drawChart2(data1, data3)
  }, 3000)
  // 获取dom，断言HTMLElement类型，否则会报错

  // const showTime = []
  // const showValue = []
  // const chartEle3: HTMLElement = document.getElementById('chart3') as HTMLElement
  // const chart3 = init(chartEle3)
  // const option3: {
  //   series: { data: ({ name: string; value: number } | { name: string; value: number })[]; type: string }[]
  //   title: { text: string }
  // } = {
  //   title: {
  //     text: '结点使用情况',
  //   },
  //   series: [
  //     {
  //       type: 'pie',
  //       data: [
  //         {
  //           name: '已使用',
  //           value: 6,
  //         },
  //         {
  //           name: '未使用',
  //           value: 34782,
  //         },
  //       ],
  //     },
  //   ],
  // }
  // option3 && chart3.setOption(option3)
  //   const chartEle4: HTMLElement = document.getElementById('chart4') as HTMLElement
  //   const chart4 = init(chartEle4)
  //   const option4: { yAxis: { max: string; type: string }; xAxis: { data: string[]; type: string; boundaryGap: boolean }; color: string; series: { areaStyle: {}; data: number[]; type: string }[]; title: { text: string } } = {
  //     title: {
  //       text: '内存利用率',
  //     },
  //     color: '#3232CD',
  //     xAxis: {
  //       type: 'category',
  //       boundaryGap: false,
  //       data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  //     },
  //     yAxis: {
  //       type: 'value',
  //       max: '100',
  //     },
  //     series: [
  //       {
  //         data: [80, 80, 80, 80, 80, 80, 80],
  //         type: 'line',
  //         areaStyle: {},
  //       },
  //     ],
  //   }
  //   option4 && chart4.setOption(option4)
  //   const chartEle5: HTMLElement = document.getElementById('chart5') as HTMLElement
  //   const chart5 = init(chartEle5)
  //   const option5: { yAxis: { max: string; type: string }; xAxis: { data: string[]; type: string; boundaryGap: boolean }; color: string; series: { areaStyle: {}; data: number[]; type: string }[]; title: { text: string } } = {
  //     title: {
  //       text: '内存利用率',
  //     },
  //     color: '#3232CD',
  //     xAxis: {
  //       type: 'category',
  //       boundaryGap: false,
  //       data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  //     },
  //     yAxis: {
  //       type: 'value',
  //       max: '100',
  //     },
  //     series: [
  //       {
  //         data: [80, 80, 80, 80, 80, 80, 80],
  //         type: 'line',
  //         areaStyle: {},
  //       },
  //     ],
  //   }
  //   option5 && chart5.setOption(option5)
  // })
  function getTime() {
    const time = new Date()
    return time.toLocaleString()
  }
})
</script>

<template>
  <div>
    <page-header title="欢迎使用 可动态组合的密文检索系统">
      <template #content>
        <div>
          <!--          <div style="margin-bottom: 5px;"> -->
          <!--            这是一款<b class="text-emphasis">开箱即用</b>的中后台框架，同时它也经历过数十个真实项目的技术沉淀，确保框架在开发中可落地、可使用、可维护 -->
          <!--          </div> -->
          <!--          <div>注：在作者就职的公司，本框架已在电商、直播、OA、ERP等多个不同领域的中后台系统中应用并稳定运行</div> -->
<!--          <div style="margin-bottom: 5px;">-->
<!--            这是一款<b class="text-emphasis">安全快捷</b>的搜索系统-->
<!--          </div>-->
        </div>
      </template>
      <!--      <el-button-group> -->
      <!--        <el-button type="success" size="large" plain @click="open('https://hooray.gitee.io/fantastic-admin/')"> -->
      <!--          开发文档 -->
      <!--        </el-button> -->
      <!--        <el-dropdown> -->
      <!--          <el-button type="primary" size="large"> -->
      <!--            代码仓库 -->
      <!--            <el-icon class="el-icon&#45;&#45;right"> -->
      <!--              <svg-icon name="ep:arrow-down" /> -->
      <!--            </el-icon> -->
      <!--          </el-button> -->
      <!--          <template #dropdown> -->
      <!--            <el-dropdown-menu> -->
      <!--              <el-dropdown-item @click="open('https://gitee.com/hooray/fantastic-admin')"> -->
      <!--                Gitee -->
      <!--              </el-dropdown-item> -->
      <!--              <el-dropdown-item @click="open('https://github.com/hooray/fantastic-admin')"> -->
      <!--                Github -->
      <!--              </el-dropdown-item> -->
      <!--            </el-dropdown-menu> -->
      <!--          </template> -->
      <!--        </el-dropdown> -->
      <!--      </el-button-group> -->
    </page-header>
    <el-row :gutter="20" style="margin: 0 10px;">
      <el-col :lg="6">
        <page-main style="margin: 0;">
          <div id="chart1" />
        </page-main>
      </el-col>
      <el-col :lg="6">
        <page-main style="margin: 0;">
          <div class="ecology vue">
            <div class="main">
              <!--              <img src="https://cn.vuejs.org/logo.svg" style="width: 30%;"> -->
              <!--              <svg t="1683190725272" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6809" width="128" height="128"><path d="M654.826667 117.333333l209.173333 209.173334V928h-704v-810.666667h494.826667zM586.666667 181.312h-362.666667V864h576v-469.333333h-213.333333V181.333333zM704 672v64H320v-64h384z m0-170.666667v64H320v-64h384z m-203.264-170.666666v64H320v-64h180.736z m276.928 0L650.666667 203.669333V330.666667h126.997333z" fill="#1677FF" p-id="6810"></path></svg> -->
              <!--              <h1>Fantastic-startkit</h1> -->
              <svg-icon name="txt" class="icon" />
              <h2>文档数据库</h2>
              <div>
                <p>数据总数：113795785</p>
                <p>数据库数量：3</p>
              </div>
            </div>
            <el-divider border-style="dashed" />
            <!--            <ul> -->
            <!--              <li v-for="item in fantasticStartkitInfo.feature" :key="item"> -->
            <!--                {{ item }} -->
            <!--              </li> -->
            <!--            </ul> -->
          </div>
        </page-main>
      </el-col>
      <el-col :lg="6">
        <page-main style="margin: 0;">
          <div class="ecology fa">
            <div class="main">
              <!--              <img src="https://hooray.gitee.io/fantastic-admin/logo.png" style="width: 30%;"> -->
              <!--              <svg t="1683190763239" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8797" width="128" height="128"><path d="M906.666667 160v704h-768v-704h768z m-167.061334 366.4l-216.405333 180.096-140.565333-110.890667L202.666667 741.141333V800h640v-188.117333l-103.061334-85.482667zM842.666667 224h-640v434.837333l179.477333-145.130666 139.968 110.421333 217.450667-180.906667 103.104 85.504V224z m-437.333334 42.666667a96 96 0 1 1 0 192 96 96 0 0 1 0-192z m0 64a32 32 0 1 0 0 64 32 32 0 0 0 0-64z" fill="#1677FF" p-id="8798"></path></svg> -->
              <!--              <h1>Fantastic-admin</h1> -->
              <svg-icon name="picture" class="icon" />
              <h2>图片数据库</h2>
              <div>
                <p>数据总数：120680880</p>
                <p>数据库数量：3</p>
              </div>
            </div>
            <el-divider border-style="dashed" />
            <!--            <el-carousel trigger="click" indicator-position="none" :interval="5000" height="250px"> -->
            <!--              <el-carousel-item v-for="(item, index) in fantasticAdminInfo.data" :key="item"> -->
            <!--                <el-image :src="item" fit="cover" style="cursor: pointer; width: 100%; height: 250px; margin: auto;" @click="fantasticAdminInfo.imageVisible = true; fantasticAdminInfo.index = index" /> -->
            <!--              </el-carousel-item> -->
            <!--            </el-carousel> -->
            <!--            <el-image-viewer v-if="fantasticAdminInfo.imageVisible" :url-list="fantasticAdminInfo.data" :initial-index="fantasticAdminInfo.index" @close="fantasticAdminInfo.imageVisible = false" /> -->
          </div>
        </page-main>
      </el-col>
      <el-col :lg="6">
        <page-main style="margin: 0;">
          <div class="ecology osa">
            <div class="main">
              <!--              <img src="https://hooray.gitee.io/one-step-admin/logo.png" style="width: 30%;"> -->
              <!--              <svg t="1683190651946" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5556" width="128" height="128"><path d="M573.44 523.4688a20.48 20.48 0 0 1-9.8304-2.4576L245.76 345.7024a20.48 20.48 0 0 1 0-35.84l317.8496-175.3088a20.48 20.48 0 0 1 20.48 0L901.12 309.6576a20.48 20.48 0 0 1 0 35.84l-317.8496 175.3088a20.48 20.48 0 0 1-9.8304 2.6624zM297.3696 327.68L573.44 479.6416 849.5104 327.68 573.44 175.7184zM573.44 953.5488a20.48 20.48 0 0 1-9.8304-2.4576L245.76 775.7824a20.48 20.48 0 1 1 20.48-35.84l307.2 169.7792 308.6336-169.7792a20.48 20.48 0 1 1 20.48 35.84l-319.2832 175.104a20.48 20.48 0 0 1-9.8304 2.6624z" fill="#0090FF" p-id="5557"></path><path d="M254.7712 778.24a20.48 20.48 0 0 1-20.48-20.48V327.68a20.48 20.48 0 0 1 40.96 0v430.08a20.48 20.48 0 0 1-20.48 20.48zM892.1088 778.24a20.48 20.48 0 0 1-20.48-20.48V327.68a20.48 20.48 0 0 1 40.96 0v430.08a20.48 20.48 0 0 1-20.48 20.48zM573.44 953.5488a20.48 20.48 0 0 1-20.48-20.48v-430.08a20.48 20.48 0 1 1 40.96 0v430.08a20.48 20.48 0 0 1-20.48 20.48z" fill="#0090FF" p-id="5558"></path></svg> -->
              <svg-icon name="space" class="icon" />
              <h2>空间数据库</h2>
              <div>
                <p>数据总数：113795785</p>
                <p>数据库数量：3</p>
              </div>
            </div>
            <el-divider border-style="dashed" />
            <!--            <el-carousel trigger="click" indicator-position="none" :interval="5000" height="250px"> -->
            <!--              <el-carousel-item v-for="(item, index) in oneStepAdminInfo.data" :key="item"> -->
            <!--                <el-image :src="item" fit="cover" style="cursor: pointer; width: 100%; height: 250px; margin: auto;" @click="oneStepAdminInfo.imageVisible = true; oneStepAdminInfo.index = index" /> -->
            <!--              </el-carousel-item> -->
            <!--            </el-carousel> -->
            <!--            <el-image-viewer v-if="oneStepAdminInfo.imageVisible" :url-list="oneStepAdminInfo.data" :initial-index="oneStepAdminInfo.index" @close="oneStepAdminInfo.imageVisible = false" /> -->
          </div>
        </page-main>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin: 0 10px;">
      <el-col :lg="6">
        <page-main style="margin: 0;">
          <div id="chart2" />
        </page-main>
      </el-col>
      <el-col :lg="6">
        <page-main style="margin: 0;">
          <div class="ecology vue">
            <div class="main">
              <!--              <img src="https://cn.vuejs.org/logo.svg" style="width: 30%;"> -->
              <!--              <svg t="1683192167815" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14040" width="128" height="128"><path d="M514.894052 473.493977a33.458481 33.458481 0 0 1-13.159625-2.696924l-165.186864-70.67518c-16.98604-7.267097-24.864766-26.928749-17.597669-43.915854 7.267097-16.98604 26.928749-24.8637 43.915854-17.597669l151.95265 65.012811 124.301452-53.792499c16.955138-7.337424 36.650889 0.459255 43.987247 17.415459 7.338489 16.956204-0.459255 36.650889-17.414394 43.988312L528.181544 470.741644a33.462743 33.462743 0 0 1-13.287492 2.752333z m332.142552-143.72442c-12.936924 0-25.253694-7.547338-30.717869-20.175251-7.338489-16.956204 0.459255-36.650889 17.415459-43.988312l65.736324-28.449299L512.198194 70.517478 125.332912 236.980878l54.735517 23.418806c16.98604 7.267097 24.864766 26.928749 17.597669 43.915854-7.267097 16.98604-26.927684 24.864766-43.915855 17.597669l-126.417648-54.087659a33.454219 33.454219 0 0 1-0.063933-61.485819L498.974635 3.368225a33.458481 33.458481 0 0 1 26.444986 0L997.12666 206.339729a33.453153 33.453153 0 0 1 0.062868 61.431476l-136.884612 59.23856a33.349794 33.349794 0 0 1-13.268312 2.759792zM445.288691 1023.529024c-4.829103 0-9.672058-1.044246-14.183625-3.157245L26.306464 830.839076A33.453153 33.453153 0 0 1 7.038002 800.542102V372.714689a33.455284 33.455284 0 0 1 46.374094-30.857457l404.799667 169.498106a33.455284 33.455284 0 0 1 20.533278 30.857457v447.86201a33.455284 33.455284 0 0 1-33.45635 33.454219zM73.945374 779.266131L411.837669 937.472533V564.47334L73.945374 422.990851v356.27528zM575.749061 1023.529024a33.454219 33.454219 0 0 1-33.456349-33.454219V544.803163a33.454219 33.454219 0 0 1 20.36492-30.78713l404.800732-172.088474a33.454219 33.454219 0 0 1 46.541386 30.78713v447.86201a33.455284 33.455284 0 0 1-20.533278 30.857457l-404.800732 169.498106a33.409465 33.409465 0 0 1-12.916679 2.596762z m33.452088-456.596379V939.799709l337.892295-141.482489V423.288142L609.201149 566.932645z" p-id="14041" fill="#1677FF"></path><path d="M512.198194 114.612345l-297.276471 127.37665 299.972329 127.376649 277.644654-132.296325z" fill="#1677FF" p-id="14042"></path><path d="M512.181145 814.688433c-4.439109 0-8.949611-0.888674-13.282165-2.766185L229.592308 695.250181c-16.953007-7.344882-24.742227-27.041698-17.39841-43.994705 7.344882-16.954073 27.042764-24.743292 43.995771-17.397345l269.306672 116.673132c16.953007 7.344882 24.743292 27.041698 17.397345 43.994706-5.467371 12.620454-17.780945 20.162464-30.712541 20.162464z" p-id="14043" fill="#1677FF"></path><path d="M520.493553 812.961165c-13.492079 0-30.464266-8.22077-35.540579-21.581785-6.561698-17.271609 2.120458-36.592283 19.391001-43.153981l261.92343-98.103676c17.27374-6.564895 36.593349 2.119392 43.153981 19.391001 6.561698 17.271609-2.120458 36.592283-19.391001 43.153982l-261.924495 98.10474c-3.910593 1.485386-3.66445 2.189719-7.612337 2.189719z" p-id="14044" fill="#1677FF"></path></svg>              &lt;!&ndash;              <h1>Fantastic-startkit</h1>&ndash;&gt; -->
              <svg-icon name="cross_media" class="icon" />
              <h2>跨媒体数据库</h2>
              <div>
                <p>数据总数：10212000</p>
                <p>数据库数量：2</p>
              </div>
            </div>
            <el-divider border-style="dashed" />
            <!--            <ul> -->
            <!--              <li v-for="item in fantasticStartkitInfo.feature" :key="item"> -->
            <!--                {{ item }} -->
            <!--              </li> -->
            <!--            </ul> -->
          </div>
        </page-main>
      </el-col>
      <el-col :lg="6">
        <page-main style="margin: 0;">
          <div class="ecology vue">
            <div class="main">
              <!--              <img src="https://cn.vuejs.org/logo.svg" style="width: 30%;"> -->
              <!--              <svg t="1683192247224" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15301" width="128" height="128"><path d="M483.374545 417.047273L105.192727 247.389091a8.610909 8.610909 0 0 0-8.145454 0A9.774545 9.774545 0 0 0 93.090909 256v519.68a8.378182 8.378182 0 0 0 5.352727 8.145455L476.392727 954.181818a9.309091 9.309091 0 0 0 3.490909 0 6.749091 6.749091 0 0 0 4.654546-1.629091 8.378182 8.378182 0 0 0 3.956363-7.447272V425.192727a8.610909 8.610909 0 0 0-5.12-8.145454zM877.847273 205.265455a8.610909 8.610909 0 0 0-5.818182-8.145455L512 69.818182 152.203636 197.12a8.610909 8.610909 0 0 0-6.050909 7.68 9.541818 9.541818 0 0 0 5.12 9.076364l357.236364 160.116363 3.956364 1.396364 360.494545-161.512727a8.843636 8.843636 0 0 0 4.887273-8.610909zM926.952727 248.087273a8.610909 8.610909 0 0 0-8.145454 0l-378.414546 168.96a9.309091 9.309091 0 0 0-4.887272 8.145454v519.912728a8.843636 8.843636 0 0 0 3.956363 7.447272 6.283636 6.283636 0 0 0 4.654546 1.629091 9.309091 9.309091 0 0 0 3.490909 0l377.949091-169.658182a8.378182 8.378182 0 0 0 5.352727-8.145454V256a9.774545 9.774545 0 0 0-3.956364-7.912727z" fill="#1677FF" p-id="15302"></path></svg>              &lt;!&ndash;              <h1>Fantastic-startkit</h1>&ndash;&gt; -->
<!--              <svg-icon name="sp_txt" class="icon" />-->
<!--              <h2>空间文本数据库</h2>-->
<!--              <div>-->
<!--                <p>数据总数：1000</p>-->
<!--                <p>数据库数量：3</p>-->
<!--              </div>-->
            </div>
<!--            <el-divider border-style="dashed" />-->
            <!--            <ul> -->
            <!--              <li v-for="item in fantasticStartkitInfo.feature" :key="item"> -->
            <!--                {{ item }} -->
            <!--              </li> -->
            <!--            </ul> -->
          </div>
        </page-main>
      </el-col>
      <el-col :lg="6">
        <page-main style="margin: 0;">
          <div class="ecology vue">
            <div class="main">
              <!--              <img src="https://cn.vuejs.org/logo.svg" style="width: 30%;"> -->
              <!--              <svg t="1683192633284" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="33796" width="128" height="128"><path d="M701.44 913.408c-1.024 0-3.584-1.024-3.584-3.584v-99.84h-177.152c-14.336 0-26.112-11.776-26.112-26.112s11.776-26.112 26.112-26.112h177.152v-99.84c0-2.56 2.048-3.584 3.584-3.584 0.512 0 1.536 0 2.048 0.512l177.152 126.464c1.024 0.512 1.536 1.536 1.536 3.072 0 1.024-0.512 2.048-1.536 2.56l-177.152 126.464h-2.048z" fill="#1677FF" p-id="33797"></path><path d="M878.592 299.52v-2.048c0-1.024-0.512-2.048-0.512-3.072l-0.512-1.536c0-1.024-0.512-1.536-1.024-2.56l-0.512-1.024-0.512-1.024-0.512-0.512-0.512-0.512-0.512-0.512-2.048-2.048-0.512-1.024-1.024-1.024-225.28-225.28-1.024-1.024-2.048-1.536-1.024-0.512h-0.512l-2.048-1.024-1.536-0.512c-1.536-0.512-2.56-1.024-3.584-1.536-1.024 0-2.048-0.512-3.072-0.512H180.224c-25.6 0-46.08 20.992-46.08 46.08V880.64c0 25.6 20.992 46.08 46.08 46.08h253.952c14.336 0 26.112-11.776 26.112-26.112s-11.776-26.624-26.112-26.624H186.368V101.888h414.208v199.168c0 14.336 11.776 26.112 26.112 26.112h199.168v251.904c0 14.336 11.776 26.112 26.112 26.112s26.112-11.776 26.112-26.112l0.512-279.552z m-225.792-24.576V139.264L788.48 274.944h-135.68z" fill="#1677FF" p-id="33798"></path><path d="M276.48 341.504h199.68c15.872 0 29.184-13.312 29.184-29.184s-13.312-29.184-29.184-29.184H276.48c-15.872 0-29.184 13.312-29.184 29.184s13.312 29.184 29.184 29.184zM276.48 472.064h276.48c15.872 0 29.184-13.312 29.184-29.184s-13.312-29.184-29.184-29.184H276.48c-15.872 0-29.184 13.312-29.184 29.184s13.312 29.184 29.184 29.184zM645.12 544.256H276.48c-15.872 0-29.184 13.312-29.184 29.184s13.312 29.184 29.184 29.184h368.64c15.872 0 29.184-13.312 29.184-29.184s-13.312-29.184-29.184-29.184z" fill="#1677FF" p-id="33799"></path></svg>              &lt;!&ndash;              <h1>Fantastic-startkit</h1>&ndash;&gt; -->
<!--              <svg-icon name="sp_time" class="icon" />-->
<!--              <h2>空间文本数据库</h2>-->
<!--              <div>-->
<!--                <p>数据总数：1000379</p>-->
<!--                <p>数据库数量：3</p>-->
<!--              </div>-->
            </div>
<!--            <el-divider border-style="dashed" />-->
            <!--            <ul> -->
            <!--              <li v-for="item in fantasticStartkitInfo.feature" :key="item"> -->
            <!--                {{ item }} -->
            <!--              </li> -->
            <!--            </ul> -->
          </div>
        </page-main>
      </el-col>
    </el-row>
    <!--    <page-main title="应用场景"> -->
    <!--      <div class="question"> -->
    <!--        <ol class="answer"> -->
    <!--          <li><span>没有前端开发人员的小型公司。</span>据了解，有些小型公司没有前端开发人员，而这些公司在开发中后台系统的时候，直接要求后端开发人员来进行开发工作。所以借助 Vue 的易学习易上手特性，再加上本框架的加持，可以让后端开发人员能在短时间内转型成为全栈开发。</li> -->
    <!--          <li><span>前端开发人员不足的中小型公司。</span>根据招聘网站统计，几乎所有公司都缺前端，其中有很大一部分中小型公司标配只有1-2名前端开发人员，而这些公司在开发中后台系统的时候，如果能有一套现成的中后台框架系统，不仅能提高项目开发效率，同时还大大减轻前端开发人员工作压力。</li> -->
    <!--          <li><span>项目型公司。</span>特点为项目多，周期短，甲方对页面布局和主题风格有绝对话语权，而通过专业版提供的布局和主题风格，可应对绝大部分甲方需求，并且可自定义扩展主题风格的样式，实现高度定制化。</li> -->
    <!--          <li><span>产品型公司。</span>产品型公司最担心的就是产品开发中代码不可控的因素，本框架除了提供完善的开发文档和代码注释外，作者还提供一对一的技术支持，确保开发人员尽可能理解整套框架源码的方方面面，为产品保驾护航。</li> -->
    <!--          <li><span>个人开发者。</span>手里有一套可高度定制化的中后台框架，什么项目都不用担心啦~</li> -->
    <!--        </ol> -->
    <!--      </div> -->
    <!--    </page-main> -->
    <!--    <page-main title="优势"> -->
    <!--      <div class="question"> -->
    <!--        <ol class="answer"> -->
    <!--          <li><span>作者拥有10年+的前后端开发经验。</span>部分框架的作者由于缺少后端开发经验，可能会在设计框架的时候，很少或者没有考虑后端的实现逻辑，导致框架在实际使用中，业务场景无法落地，开发人员得通过修改源码自行实现业务。</li> -->
    <!--          <li><span>经历过数十个真实项目的打磨。</span>没用在真实业务场景中使用过的框架都是纸飞机，哪怕它提供的演示功能特别华丽。而本框架在作者就职的公司，已经稳定应用在电商、直播、OA、CRM、ERP等多个不同领域的中后台系统中。</li> -->
    <!--          <li><span>丰富的组件库。</span>除了支持 ElementUI / Element Plus 自带的组件外，框架还扩充了部分业务组件，以及第三方插件。借助以往的项目经验，提供最佳实践方案，方便开发人员直接使用。</li> -->
    <!--          <li><span>持续更新的业务应用静态页面。</span>通过项目积累，沉淀出数十个业务应用的静态页面，做到开发人员拿来即可使用，极大提升开发效率的同时，还省去了产品和设计人员的工作。</li> -->
    <!--          <li><span>长期维护。</span>无论是免费的基础版，还是付费的专业版，均提供长期维护。区别在于基础版侧重于稳定性维护，主要在修复 bug ，不定期增加新特性；专业版侧重于新特性开发，在确保稳定的基础上，会长期深挖中后台系统框架，持续产出可落地的特性或开发规范。</li> -->
    <!--        </ol> -->
    <!--      </div> -->
    <!--    </page-main> -->
    <!--    <el-row :gutter="20" style="margin: 0 10px;"> -->
    <!--      <el-col :lg="8"> -->
    <!--        <div id="chart1" /> -->
    <!--      </el-col> -->
    <!--      <el-col :lg="8"> -->
    <!--        <div id="chart2" /> -->
    <!--      </el-col> -->
    <!--      <el-col :lg="8"> -->
    <!--        <div id="chart3" /> -->
    <!--      </el-col> -->
    <!--    </el-row> -->
  </div>
</template>

<style lang="scss" scoped>
.text-emphasis {
  text-emphasis-style: "❤";
}
#chart1 {
  width: 300px;
  height: 330px;
}
#chart2 {
  width: 280px;
  height: 330px;
}
#chart3 {
  width: 280px;
  height: 350px;
}
//#chart4 {
//  width: 300px;
//  height: 350px;
//}
//#chart5 {
//  width: 300px;
//  height: 350px;
//}
.icon{
  height: 15%;
  width: 15%;
}
.ecology {
  padding: 10px 0 0;

  &.vue {
    h1 {
      color: #41b883;
    }
  }

  &.fa {
    h1 {
      color: #e60000;
    }
  }

  &.osa {
    h1 {
      color: #67c23a;
    }
  }

  .main {
    text-align: center;

    img {
      display: block;
      margin: 0 auto;
    }

    h1 {
      margin: 10px auto 0;
      text-align: center;
    }

    h2 {
      font-size: 16px;
      font-weight: normal;
      color: var(--el-text-color-secondary);
      text-align: center;
    }
  }

  .el-carousel {
    box-shadow: var(--el-box-shadow-light);
    transition: var(--el-transition-box-shadow);
  }

  ul li {
    line-height: 28px;
  }
}

.question {
  .answer {
    margin: 20px 0 0;
    padding-left: 20px;
    font-size: 16px;
    color: var(--el-text-color-secondary);

    li {
      margin-bottom: 10px;
      line-height: 1.5;

      &:last-child {
        margin-bottom: 0;
      }
    }

    span {
      color: var(--el-text-color-primary);
      font-weight: bold;
    }
  }
}
</style>
