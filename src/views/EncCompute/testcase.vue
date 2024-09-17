<script lang="ts">
import {Plus,Upload} from '@element-plus/icons'
import axios from "axios";
export default {
  components: {
    Plus,
    Upload
  },
  data() {
    return {
      baseUrl: 'http://10.195.25.117:9999',
      switchMethods: '预置测试用例',
      value: '',
      options: [
        {
          value: 12,
          label: '决策树模型'
        },
        {
          value: 13,
          label: '逻辑回归'
        }
      ],
      result: {
        comresult: '',
        datanum: '',
        datapath: '',
        parseJson: '',
        comtype: '',
        bindtype: '',
        calculate: ''
      }
    }
  },
  methods: {
    UploadFile(item) {
      const FormDatas = new FormData()
      FormDatas.append('file', item.file)
      console.log(item)
      const url = this.baseUrl + '/files/upload'
      axios.post(url,FormDatas).then((response) => {
        console.log(response)
        if (response.data.code === 20000) {
          this.$message.success('上传成功')
          this.getData0()
          // this.getList()//刷新页面
        } else {
          this.$message.error('上传失败')
        }
      })
    },
    GetResult: function() {
      const url = this.baseUrl + '/files/pyExec'
      axios.get(url,{params:{type:this.value}}).then(response => {
        console.log(response.data)
        this.result = response.data.data
      })
    }
  }
}
</script>

<template>
  <div>
    <div class="left-bar">
      <h3>▶︎ 请选择您需要的方式:</h3>
      <el-radio-group v-model="switchMethods" @change="agreeChange">
        <el-radio-button label="预置测试用例" />
        <el-radio-button label="导入测试用例" />
      </el-radio-group>
      <div class="select" v-if="switchMethods=='预置测试用例'">
        <h3>▶︎ 请选择测试用例</h3>
        <el-select
          v-model="value"
          clearable
          placeholder="Select"
          style="width: 240px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="select" v-if="switchMethods=='导入测试用例'">
        <h3>▶︎ 请导入测试用例</h3>
        <el-upload
          action
          :http-request="UploadFile"
          :show-file-list="false"
          style="display: inline-block"
          drag>
          <i class="el-icon-upload"/>
          <div class="el-upload__text">
            将文件拖到此处，或<em>点击上传</em>
          </div>
        </el-upload>
      </div>
      <div>
        <el-dropdown class="combotton">
          <el-button type=success @click="GetResult()">计算结果</el-button>
        </el-dropdown>
      </div>
    </div>
    <div class="right-bar">
      <el-scrollbar class="box-item4" height="400px">
        <p> {{result.comresult}} </p>
      </el-scrollbar>
      <el-scrollbar class="box-item5">
        <div>
          <p> 运行时间：{{ result.calculate }} </p>
          <p> {{ result.parseJson }} </p>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<style scoped lang="scss">
.left-bar {
  float: left;
  top:15px;
  left: 100px;
  width: 50%;
  height: 100%;
  position: absolute;
  overflow: auto;
  justify-items: center;
  align-items: center;
}
.right-bar {
  /*margin-top: -190px;*/
  top:15px;
  float: right;
  right: 100px;
  width: 50%;
  height: 100%;
  position: absolute;
  overflow: auto;
}
.select{
  top:20px;
}
.combotton{
  top:20px;
  height: 80px;
}
.box-item4 {
  grid-column: 1 / 3;
  width: 600px;
  height: 300px;
  margin: 28px 0;
  padding: 45px 24px 4px 20px;
  border: solid 2px #42b883;
  border-radius: 8px;
  overflow-x: auto;
  transition: color .5s, background-color .5s;
  position: relative;
  font-size: 14px;
  line-height: 1.6;
  font-weight: 500;
  color: #0000008c;
  background-color: #ffffff;
}

.box-item4:before{
  content: "➤ 运行结果";
  position: absolute;
  font-weight: 600;
  font-size: 17px;
  top: 20px;
  left: 17px;
  color: #42b883;
}

.box-item5 {
  grid-column: 3 / 6;
  width: 600px;
  height: 300px;
  margin: 28px 0;
  padding: 45px 24px 4px 20px;
  border: solid 2px #42b883;
  border-radius: 8px;
  overflow-x: auto;
  transition: color .5s, background-color .5s;
  position: relative;
  font-size: 14px;
  line-height: 1.6;
  font-weight: 500;
  color: #0000008c;
  background-color: #ffffff;
}

.box-item5:before{
  content: "ⓘ 运行日志";
  position: absolute;
  font-weight: 600;
  font-size: 17px;
  top: 20px;
  left: 17px;
  color: #42b883;
}
</style>
