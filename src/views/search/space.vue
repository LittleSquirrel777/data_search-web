<route lang="yaml">
meta:
  enabled: false
</route>

<script lang="ts" setup>
import type { UploadProps, UploadUserFile } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import {
  reqDataBaseS,
  reqQueryByArea,
  reqQueryByDataS,
  reqcreateDataBaseS,
  reqremoveDataBaseS,
  reqselectDataBaseS,
} from '@/api'

// 上传文件相关数据
const uploadPath = ref('')
// const fileList = ref<UploadUserFile[]>([
//
// ])
const submitData = {
  path: '/home/dell02/apps/hui/res/Part1/awards_1990/awd_1990_00',
}
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
  options1.value = await reqDataBaseS()
}
// 创建数据库
async function createDataBase() {
  DataBaseName.path = sel_db.value
  await reqcreateDataBaseS(DataBaseName)
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
  reqselectDataBaseS(selectDataBase)
}
// 删除数据库
async function removeDataBase() {
  DataBaseName.path = rem_db.value
  await reqremoveDataBaseS(DataBaseName)
}
// 确认上传路径
function IsUploadPath() {
  submitData.path = uploadPath.value
}
onMounted(() => {
  reqDataBaseS()
})
const keyword = ref('')
const keyword1 = ref('')
const QueryByData = {
  data: '',
}
const QueryByArea = {
  area: '',
}
const data1 = ref({
  content: {},
  result: {},
  sum: {},
})
const data2 = ref([])
let total = 100
let current = 1
const pageNum = 5

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
}

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`,
  )
}

const beforeRemove: (uploadFile, uploadFiles) => Promise<boolean> = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `Cancel the transfer of ${uploadFile.name} ?`,
  ).then(
    () => true,
    () => false,
  )
}

async function search() {
  QueryByData.data = keyword.value
  data1.value = await reqQueryByDataS(QueryByData)
  total = data1.value.sum
  if (data1.value.sum < pageNum) {
    data2.value = data1.value.result
  }
  else {
    data2.value = data1.value.result.slice(0, pageNum)
  }
}
async function search1() {
  QueryByArea.area = keyword1.value
  data1.value = await reqQueryByArea(QueryByArea)
  total = data1.value.sum
  if (data1.value.sum < pageNum) {
    data2.value = data1.value.result
  }
  else {
    data2.value = data1.value.result.slice(0, pageNum)
  }
}
function changePage(value: number) {
  current = value
  const _start = (value - 1) * pageNum
  const _end = value * pageNum
  data2.value = data1.value.result ? data1.value.result.slice(_start, _end) : []
}
const options2 = ref([
  { value: '选项1', label: '空间搜索' },
  { value: '选项2', label: '范围搜索' },
])
const value_space = ref('选项1')
</script>

<template>
  <div>
    <page-header title="空间搜索">
      <template #content>
        <el-row :gutter="20" style="margin: 0 10px;">
<!--          <el-col :lg="3">-->
<!--            <p>Search_space</p>-->
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
<!--          action="http://127.0.0.1:8070/space/insert"-->
<!--          multiple-->
<!--          :on-preview="handlePreview"-->
<!--          :on-remove="handleRemove"-->
<!--          :before-remove="beforeRemove"-->
<!--          :limit="3"-->
<!--          :on-exceed="handleExceed"-->
<!--          :data="submitData"-->
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
          <el-select v-model="value_space" placeholder="请选择" class="select1">
            <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-input v-show="value_space === '选项1'" v-model="keyword" placeholder="Please input" class="input" @keydown.enter="search" />
          <el-button v-show="value_space === '选项1'" type="primary" @click="search">
            <template #icon>
              <el-icon>
                <svg-icon name="ep:search" />
              </el-icon>
            </template>
            搜索
          </el-button>
          <el-input v-show="value_space === '选项2'" v-model="keyword1" placeholder="Please input" class="input" @keydown.enter="search1" />
          <el-button v-show="value_space === '选项2'" type="primary" @click="search1">
            <template #icon>
              <el-icon>
                <svg-icon name="ep:search" />
              </el-icon>
            </template>
            搜索
          </el-button>
        </page-main>
<!--      </el-col>-->
<!--      <el-col :md="8" />-->
<!--    </el-row>-->
    <page-main>
      <el-divider><h2>搜索时间</h2></el-divider>
      <div style="text-align: center;min-height: 50px;line-height: 50px">
        <p>{{data1.time}}</p>
      </div>
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
  </div>
</template>

<style scoped>
.select{
  position: relative;
  top: 8px;
}
.input{
  width: 50%;
}
.select1{
  width: 10%;
}
</style>
