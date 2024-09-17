<route lang="yaml">
meta:
  enabled: false
</route>

<script lang="ts" setup>
import {
  reqcreateDataBaseCross,
  reqDataBaseCross,
  reqDataBaseS,
  reqimgQuerytxt,
  reqremoveDataBaseCross,
  reqselectDataBaseCross,
} from '@/api'
import type {UploadProps, UploadUserFile} from 'element-plus'
import {ref} from 'vue'

let current = 1
const QueryByData = {
  data: '',
}
const data1 = ref({
  content: {},
  result: {},
  sum: {},
})
const data2 = ref([])
let total = 100
const pageNum = 10
// 上传文件相关数据
const uploadPath = ref('')
const fileList = ref<UploadUserFile[]>([

])
const submitData = {
  path: '/home/dell02/apps/hui/res/Part1/awards_1990/awd_1990_00',
}
const value1 = ref(8) // 显示图片个数
// 数据库相关数据
const value_key = ref('')
const sel_db = ref('')
const DataBaseName = {
  path: '',
}
const selectDataBase = {
  path: '',
}
const rem_db = ref('')
const options1 = ref({
  dbIndex: <any>'',
  dbName: <any>'',
})
const value_s = ref('/million')

// 获取当前数据库
async function getDataBase() {
  options1.value = await reqDataBaseCross()
  // console.log(options1.value)
}
// 创建数据库
async function createDataBase() {
  DataBaseName.path = sel_db.value
  await reqcreateDataBaseCross(DataBaseName)
}
// 选择数据库
function selectDataBaseName(value) {
  value_key.value = value
  let obj = {}
  obj = options1.value.find((item) => {
    return item.dbIndex === value
  })
  let getName = ''
  getName = obj.dbName
  selectDataBase.path = getName
  reqselectDataBaseCross(selectDataBase)
}
// 删除数据库
async function removeDataBase() {
  DataBaseName.path = rem_db.value
  await reqremoveDataBaseCross(DataBaseName)
}
// 确认上传路径
function IsUploadPath() {
  submitData.path = uploadPath.value
}
onMounted(() => {
  reqDataBaseS()
})
const image = ref()
const handleSuccess1: UploadProps['onSuccess'] = (res) => {
  // data1.value = res
  // total = data1.value.sum
  // if (data1.value.sum < pageNum) {
  //   data2.value = data1.value.result
  // }
  // else {
  //   data2.value = data1.value.result.slice(0, pageNum)
  // }
  if (res.code == 200)
  {
    alert('提取特征成功')
  }
  else
  {
    alert('提取特征失败')
  }
}
function changePage(value: number) {
  current = value
  const _start = (value - 1) * pageNum
  const _end = value * pageNum
  data2.value = data1.value.result ? data1.value.result.slice(_start, _end) : []
}
// const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
//   console.log(file, uploadFiles)
// }
//
// const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
//   console.log(uploadFile)
// }

// const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
//   ElMessage.warning(
//     `The limit is 3, you selected ${files.length} files this time, add up to ${
//       files.length + uploadFiles.length
//     } totally`,
//   )
// }
const handlebeforeUpload: UploadProps['beforeUpload'] = (file) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    let image: Element
    const temp = document.getElementById('show_img')
    // image = document.getElementById('show_img')
    if (temp) {
      image = temp;
      image.src = reader.result
    }

    // this.File = reader.result
  }
}
async function search(){
  data1.value = await reqimgQuerytxt()
  total = data1.value.sum
  if (data1.value.sum < pageNum) {
    data2.value = data1.value.result
  }
  else {
    data2.value = data1.value.result.slice(0, pageNum)
  }
}
// const beforeRemove: (uploadFile, uploadFiles) => Promise<boolean> = (uploadFile) => {
//   return ElMessageBox.confirm(
//     `Cancel the transfer of ${uploadFile.name} ?`,
//   ).then(
//     () => true,
//     () => false,
//   )
// }
// const url = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
</script>

<template>
  <div>
    <page-header title="以图搜文">
      <template #content>
        <el-row :gutter="20" style="margin: 0 10px;">
          <!--          <el-col :lg="3"> -->
          <!--            <p>img-txt</p> -->
          <!--          </el-col> -->
          <el-row :lg="8">
            <p>选择数据库</p>
            <el-select v-model="value_s" placeholder="请选择" class="select" @click="getDataBase" @change="selectDataBaseName">
              <el-option v-for="item in options1" :key="item.dbIndex" :label="item.dbName" :value="item.dbIndex" />
            </el-select>
            <div style="position: relative;top: 8px;margin-left: 10px">
              <el-input v-model="sel_db" placeholder="Please input" class="input" style="width: 25%;" />
              <el-button type="primary" class="btn" @click="createDataBase">
                <template #icon>
                  <el-icon>
                    <svg-icon name="ep:circle-plus" />
                  </el-icon>
                </template>
                新建数据库
              </el-button>
              <el-input v-model="rem_db" placeholder="Please input" class="input" style="width: 25%;margin-left: 10px" />
              <el-button type="primary" class="btn" @click="removeDataBase">
                <template #icon>
                  <el-icon>
                    <svg-icon name="ep:circle-close" />
                  </el-icon>
                </template>
                删除当前数据库
              </el-button>
            </div>
          </el-row>
        </el-row>
      </template>
      <div>
        <!--        <el-upload -->
        <!--          v-model:file-list="fileList" -->
        <!--          class="upload-demo" -->
        <!--          action="http://127.0.0.1:8070/crossmodel/upload" -->
        <!--          multiple -->
        <!--          :on-preview="handlePreview" -->
        <!--          :on-remove="handleRemove" -->
        <!--          :before-remove="beforeRemove" -->
        <!--          :limit="3" -->
        <!--          :on-exceed="handleExceed" -->
        <!--          :data="submitData" -->
        <!--        > -->
        <!--          <el-button type="primary"> -->
        <!--            点击上传 -->
        <!--          </el-button> -->
        <!--          <template #tip> -->
        <!--            <div class="el-upload__tip"> -->
        <!--              <el-input v-model="uploadPath" placeholder="请输入上传的文件夹路径" class="input" style="width: 30%;" /> -->
        <!--              <el-button type="primary" class="btn" @click="IsUploadPath"> -->
        <!--                <template #icon> -->
        <!--                  <el-icon> -->
        <!--                    <svg-icon name="ep:circle-check" /> -->
        <!--                  </el-icon> -->
        <!--                </template> -->
        <!--                确认路径 -->
        <!--              </el-button> -->
        <!--            </div> -->
        <!--          </template> -->
        <!--        </el-upload> -->
      </div>
    </page-header>
    <el-row :gutter="20" style="margin: -10px 10px;">
      <el-col :md="6">
        <page-main style="margin: 10px 0;">
          <image-upload v-model:url="image" action="http://127.0.0.1:8070/crossmodel/imgQuerytxtToken" :width="250" :height="150" @on-success="handleSuccess1" @before-upload="handlebeforeUpload" />
          <div><p style="text-align: center;">上传文件以提取特征</p></div>
          <div style="margin-top: 10px;vertical-align: middle;align-content: center">
            <el-button type="primary" size="large" @click="search">
              点击搜索
            </el-button>
          </div>
          <div style="margin-top: 40px;vertical-align: middle;align-content: center">
            <el-divider><h2>搜索图片</h2></el-divider>
            <div class="localPic">
              <img id="show_img" src="" style="width: 200px;border:none;margin-top: 20px">
            </div>
          </div>
        </page-main>
      </el-col>
      <el-col :md="18">
        <page-main style="margin: 10px 0;">
          <el-divider><h2>搜索时间</h2></el-divider>
          <div style="text-align: center;min-height: 50px;line-height: 50px">
            <p>{{data1.time}}</p>
          </div>
          <el-divider><h2>前5个文件内容</h2></el-divider>
          <ul class="doc_content" style="list-style-type: none;min-height: 200px;line-height: 35px">
            <li v-for="item in data1.content ">
              <p style="text-align: center;min-height: 20px">
                {{ item }}
              </p>
            </li>
          </ul>
          <el-divider><h2>搜索结果</h2></el-divider>
          <el-table :data="data2" border stripe highlight-current-row height="100%">
            <el-table-column type="index" width="50" />
            <el-table-column prop="name" label="文件名称" min-width="180" />
            <el-table-column prop="date" label="上传时间" min-width="180" />
            <el-table-column prop="accessTime" label="上次修改时间" min-width="180" />
            <el-table-column prop="user" label="所属用户" min-width="180" />
            <el-table-column prop="size" label="文件大小" min-width="180" />
          </el-table>
          <el-pagination
            v-model:current-page="current"
            :page-size="pageNum"
            :pager-count="11"
            layout="prev, pager, next"
            :total="total"
            @current-change="changePage"
          />
        </page-main>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.image-group {
  list-style-type:none;
  display: flex;
  flex-wrap: wrap;
  transition: all ease-in-out 0.3s;
}
.image-group li{
  cursor: pointer;
  margin-left: 20px;
  margin-top: 10px;
}
.image{
  width: 300px;
  height: 300px;
  transition: all ease-in-out 0.3s;
}
.image :hover{
  transform: scale(1.1);
}
.select{
  position: relative;
  top: 8px;
}
.localPic{
  text-align: center;
}
</style>
