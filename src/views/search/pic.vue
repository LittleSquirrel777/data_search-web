<route lang="yaml">
meta:
  enabled: false
</route>

<script lang="ts" setup>
import type { UploadProps, UploadUserFile } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import {reqDataBaseG, reqcreateDataBaseG, reqremoveDataBaseG, reqselectDataBaseG, reqQueryByImage, Piccheck} from '@/api'

const searchList = ref({
  result: {},
})
// onMounted(() => console.log(searchList.value))
let image = ''
let visible = false
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
  options1.value = await reqDataBaseG()
  console.log(options1.value)
}
// 创建数据库
async function createDataBase() {
  DataBaseName.path = sel_db.value
  await reqcreateDataBaseG(DataBaseName)
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
  reqselectDataBaseG(selectDataBase)
}
// 删除数据库
async function Check() {
  searchList.value = await Piccheck()
}
async function removeDataBase() {
  DataBaseName.path = rem_db.value
  await reqremoveDataBaseG(DataBaseName)
}
// 确认上传路径
// function IsUploadPath() {
//   submitData.path = uploadPath.value
// }
onMounted(() => {
  reqDataBaseG()
})
const handleSuccess1: UploadProps['onSuccess'] = (res) => {
  // searchList.value = res
  if (res.code == 200)
  {
    alert('提取特征成功')
  }
  else
  {
    alert('提取特征失败')
  }
}
async function search(){
  searchList.value = await reqQueryByImage()
}
// const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
//   console.log(file, uploadFiles)
// }

// const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
//   visible = true
//   image.value = uploadFile
//   console.log(visible)
// }
const handlebeforeUpload: UploadProps['beforeUpload'] = (file) => {
  console.log('1')
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = (e) => {
    const image = document.getElementById('show_img')
    image.src = reader.result
    // this.File = reader.result
  }
}
// function handleBeforeUpload(file) {
//   const reader = new FileReader()
//   reader.readAsDataURL(file)
//   reader.onload = (e) => {
//     const image = document.getElementById('show_img')
//     image.src = reader.result
//     this.File = reader.result
//   }
//   console.log(image.value.src)
//   // var image = document.getElementById("show_img");
//   // console.log(this.File);
//   // this.$bus.emit("busEvent1", this.File);
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
// let uploadList = []
// function handleView(url) {
//   image = url
//   visible = true
// }
// const url = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
</script>

<template>
  <div>
    <page-header title="图像搜索">
      <template #content>
        <el-row :gutter="20" style="margin: 0 10px;">
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
      <!--      <div> -->
      <!--        <el-upload -->
      <!--          v-model:file-list="fileList" -->
      <!--          class="upload-demo" -->
      <!--          action="http://127.0.0.1:8070/cscbf/insert" -->
      <!--          multiple -->
      <!--          :on-preview="handlePreview" -->
      <!--          :on-remove="handleRemove" -->
      <!--          :before-remove="beforeRemove" -->
      <!--          :limit="3" -->
      <!--          :on-exceed="handleExceed" -->
      <!--          :data="submitData" -->
      <!--          :show-file-list="true" -->
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
      <!--      </div> -->
    </page-header>
    <el-row :gutter="20" style="margin: -10px 10px;">
      <el-col :md="6">
        <page-main style="margin: 10px 0;">
          <image-upload v-model:url="image" action="http://127.0.0.1:8070/image/queryToken" :width="250" :height="150" @on-success="handleSuccess1" @before-upload="handlebeforeUpload" />
<!--          <div class="demo-upload-list" v-for="item in uploadList.slice(0,1)" :key="item.url">-->
<!--            <img :src="item.url" style="width: 200px;height: 200px"/>-->
<!--            <div class="demo-upload-list-cover">-->
<!--              <i-->
<!--                class="el-icon-error"-->
<!--                @click.native="handleView(item.url)"-->
<!--              />-->
<!--              <i-->
<!--                class="el-icon-on"-->
<!--                @click.native="handleRemove(item)"-->
<!--              />-->
<!--            </div>-->
<!--          </div>-->
<!--          <el-upload-->
<!--            :show-upload-list="false"-->
<!--            :format="['jpg', 'jpeg', 'png']"-->
<!--            :before-upload="handleBeforeUpload"-->
<!--            :on-success="handleSuccess1"-->
<!--            multiple-->
<!--            type="drag"-->
<!--            action="http://127.0.0.1:8070/image/query"-->
<!--            style="display: inline-block;width:58px;"-->
<!--          >-->
<!--            <div style="width: 58px;height:58px;line-height: 58px;">-->
<!--              <i class="el-icon-plus" size="20"/>-->
<!--            </div>-->
<!--          </el-upload>-->
          <!--          <el-dialog v-model="visible" title="查看图片">-->
<!--            <img v-if="visible" :src="image" style="width: 100%">-->
<!--            <div slot="footer" class="modal_footer">-->
<!--              <el-button-->
<!--                class="option_btn"-->
<!--                style="background-color: #e00003;"-->
<!--                @click="visible = false"-->
<!--              >-->
<!--                确定-->
<!--              </el-button>-->
<!--              &lt;!&ndash; <Button class="option_btn" @click="close_modal" style="background-color: #a1a0ae;">取消</Button> &ndash;&gt;-->
<!--            </div>-->
<!--          </el-dialog>-->
          <div style="margin-top: 30px;vertical-align: middle;align-content: center">
            <el-button type="primary" size="large" @click="search">
              点击搜索
            </el-button>
            <el-button type="primary" size="large" @click="Check">
              验证
            </el-button>
            <div style="margin-top: 40px;vertical-align: middle;align-content: center">
            <el-divider ><h2>搜索图片</h2></el-divider>
            <div class="localPic">
              <img id="show_img" src="" style="width: 200px;border:none;margin-top: 20px">
            </div>
            </div>
            <!--            <p>返回图片数量</p> -->
            <!--            <el-slider v-model="value1" :max="10" /> -->

          </div>
        </page-main>
      </el-col>
      <el-col :md="18">
        <page-main style="margin: 10px 0;">
          <el-divider><h2>搜索时间</h2></el-divider>
          <div style="text-align: center;min-height: 50px;line-height: 50px">
            <p>{{searchList.time}}</p>
          </div>
          <el-divider><h2>搜索结果</h2></el-divider>
          <ul class="image-group" style="list-style-type: none">
            <li v-for="item in searchList.result">
              <img :src="`data:image/jpg;base64,${item}`" class="image">
            </li>
          </ul>
        </page-main>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.select{
  position: relative;
  top: 8px;
}
.image-group {
  list-style-type:none;
  display: flex;
  flex-wrap: wrap;
  transition: all ease-in-out 0.3s;
}
.image-group li{
  cursor: pointer;
  margin-left: 10px;
  margin-top: 10px;
  width: 280px;
  height: 280px;
}
.image{
  transition: all ease-in-out 0.3s;
}
.image :hover{
  transform: scale(1.1);
}
.localPic{
  text-align: center;
}
</style>
