<route lang="yaml">
meta:
  enabled: false
</route>

<script lang="ts" setup>
import type { UploadProps, UploadUserFile } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import { reqDataBase, reqQueryByData, reqcreateDataBase, reqremoveDataBase, reqselectDataBase } from '@/api'

const keyword = ref('')
let current = 1
const QueryByData = {
  data: '',
}
const data1 = ref([])
const data2 = ref([])
let total = 100
const pageNum = 10
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
const value_s = ref('database1')
// 上传文件相关数据
const uploadPath = ref('')
const fileList = ref<UploadUserFile[]>([

])
const submitData = {
  path: '/home/dell02/apps/hui/res/Part1/awards_1990/awd_1990_00',
}

// 获取当前数据库
async function getDataBase() {
  options1.value = await reqDataBase()
  console.log(options1.value)
}
// 创建数据库
async function createDataBase() {
  DataBaseName.path = sel_db.value
  await reqcreateDataBase(DataBaseName)
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
  reqselectDataBase(selectDataBase)
}
// 删除数据库
async function removeDataBase() {
  DataBaseName.path = rem_db.value
  await reqremoveDataBase(DataBaseName)
}
// 确认上传路径
function IsUploadPath() {
  submitData.path = uploadPath.value
}
onMounted(() => {
  getDataBase()
})
// const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
//   console.log(file, uploadFiles)
// }

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

// const beforeRemove: (uploadFile, uploadFiles) => Promise<boolean> = (uploadFile, uploadFiles) => {
//   return ElMessageBox.confirm(
//     `Cancel the transfer of ${uploadFile.name} ?`,
//   ).then(
//     () => true,
//     () => false,
//   )
// }
async function search() {
  QueryByData.data = keyword.value
  data1.value = await reqQueryByData(QueryByData)
  total = data1.value.sum
  if (data1.value.sum < pageNum) {
    data2.value = data1.value.result
  }
  else {
    data2.value = data1.value.result.slice(0, pageNum)
  }
  console.log(data2.value)
}
function changePage(value) {
  current = value
  const _start = (value - 1) * pageNum
  const _end = value * pageNum
  data2.value = data1.value.result ? data1.value.result.slice(_start, _end) : []
}
</script>

<template>
  <div>
    <page-header title="文本搜索">
      <template #content>
        <el-row :gutter="20" style="margin: 0 10px;">
<!--          <el-col :lg="3">-->
<!--            <p>Search_txt</p>-->
<!--          </el-col>-->
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
<!--        <el-upload-->
<!--          v-model:file-list="fileList"-->
<!--          class="upload-demo"-->
<!--          action="http://127.0.0.1:8070/cscbf/insert"-->
<!--          :on-preview="handlePreview"-->
<!--          :on-remove="handleRemove"-->
<!--          :before-remove="beforeRemove"-->
<!--          :on-exceed="handleExceed"-->
<!--          :data="submitData"-->
<!--          :multiple="true"-->
<!--          :show-file-list="false"-->
<!--        >-->
<!--          <el-button type="primary">-->
<!--            点击上传-->
<!--          </el-button>-->
<!--          <template #tip>-->
<!--            <div class="el-upload__tip">-->
<!--              <el-input v-model="uploadPath" placeholder="请输入上传的文件夹路径" class="input" style="width: 30%;" />-->
<!--              <el-button type="primary" class="btn" @click="IsUploadPath">-->
<!--                <template #icon>-->
<!--                  <el-icon>-->
<!--                    <svg-icon name="ep:circle-check" />-->
<!--                  </el-icon>-->
<!--                </template>-->
<!--                确认路径-->
<!--              </el-button>-->
<!--            </div>-->
<!--          </template>-->
<!--        </el-upload>-->
      </div>
    </page-header>
<!--    <el-row style="margin: -20px 10px;">-->
<!--      <el-col :md="8" />-->
<!--      <el-col :md="8">-->
    <page-main style="margin: 10px 0;">
         <div style="width: 100%;height: 800px">
           <iframe id="frame" src="public/static/map.html" style="width: 200%;height: 100%;border: none" />
         </div>
    </page-main>
  </div>
</template>

<style scoped>
.select{
  position: relative;
  top: 8px;
}
.input{
  width: 50%;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.btn{
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
</style>
