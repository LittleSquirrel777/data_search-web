<script lang="ts">
import axios from "axios";
import {Plus,Upload} from '@element-plus/icons'
import global from "@/views/EncCompute/global.vue";
export default {
  components: {
    Plus,
    Upload
  },
  data() {
    return {
      baseUrl: 'http://10.195.25.117:9999',
      textarea: '',
      comnum: 0,
      myvalue: '',
      selectionKey0: [],
      selectionKey1: [],
      dataonLineListSelection0: [],
      dataonLineListSelection1: [],
      options: [{
        value: 'xor',
        label: 'xor',
        type: 1
      }, {
        value: 'and',
        label: 'and',
        type: 2
      }, {
        value: 'compare',
        label: 'compare',
        type: 3
      }],
      opTo: [{
        value: 'p0',
        label: '发起方'
      }, {
        value: 'p1',
        label: '协作方'
      }, {
        value: 'two',
        label: '两方'
      }],
      chosevalue: '',
      chosetype: 0,
      tovalue: '',
      value: '',
      list0: [],
      length0: 0,
      list1: [],
      length1: 0,
      result: {
        comresult: '',
        datanum: '',
        datapath: '',
        parseJson: '',
        comtype: '',
        bindtype: '',
        calculate: ''
      },
      resultList: []
    }
  },
  methods: {
    handleClear() {
      this.textarea = ''
    },
    UploadFile0(item) {
      const FormDatas = new FormData()
      FormDatas.append('file', item.file)
      FormDatas.append('index', '0')
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
    getData0: function() {
      const url = this.baseUrl + '/files/getVariable'
      axios.get(url).then(response => {
        // eslint-disable-next-line no-unused-vars
        console.log(response.data.data)
        this.list0 = response.data.data
        this.length0 = response.data.data.length
        console.log(response.data.data)
        // console.log(this.list0.name)
        for (let i = 0; i < this.length0; i++) {
          this.selectionKey0.push(i)
        }
        console.log(this.selectionKey0)
      })
    },
    UploadFile1(item) {
      const FormDatas = new FormData()
      FormDatas.append('file', item.file)
      FormDatas.append('index', '1')
      console.log(item)
      const url = this.baseUrl + '/files/upload'
      axios.post(url,FormDatas).then((response) => {
        console.log(response)
        if (response.data.code === 20000) {
          this.$message.success('上传成功')
          this.getData1()
          // this.getList()//刷新页面
        } else {
          this.$message.error('上传失败')
        }
      })
    },
    getData1: function() {
      const url = this.baseUrl + '/files/getVariable'
      axios.get(url).then(response => {
        // eslint-disable-next-line no-unused-vars
        this.list1 = response.data.data
        this.length1 = response.data.data.length
        console.log(response.data.data)
        // console.log(this.list0.name)
        for (let i = 0; i < this.length1; i++) {
          this.selectionKey1.push(i)
        }
        console.log(this.selectionKey1)
      })
    },
    selectHandle(row, index) {
      return !(index === 0)
    },
    // 选择数据
    handleSelectionChange0(val) {
      if (val.length > 1) {
        var newVal = val.filter((it, index) => {
          // eslint-disable-next-line eqeqeq
          if (index == val.length - 1) {
            this.$refs.multipleTable0.toggleRowSelection(it, true)
            return true
          } else {
            this.$refs.multipleTable0.toggleRowSelection(it, false)
            return false
          }
        })
        this.dataonLineListSelection0 = newVal
      } else {
        this.dataonLineListSelection0 = val
      }
      console.log(this.dataonLineListSelection0)
      console.log(this.value)
    },
    handleSelectionChange1(val) {
      if (val.length > 1) {
        var newVal = val.filter((it, index) => {
          // eslint-disable-next-line eqeqeq
          if (index == val.length - 1) {
            this.$refs.multipleTable1.toggleRowSelection(it, true)
            return true
          } else {
            this.$refs.multipleTable1.toggleRowSelection(it, false)
            return false
          }
        })
        this.dataonLineListSelection1 = newVal
      } else {
        this.dataonLineListSelection1 = val
      }
      console.log(this.dataonLineListSelection1)
      console.log(this.value)
    },
    // 生成算式
    GeneExpre() {
      const mycom = this.dataonLineListSelection0 + ' ' + this.chosevalue + ' ' + this.dataonLineListSelection1
      this.textarea = this.textarea + mycom + '\n'
      // eslint-disable-next-line eqeqeq
      if (this.chosevalue == 'xor') {
        this.chosetype = 7
        // eslint-disable-next-line eqeqeq
      } else if (this.chosevalue == 'and') {
        this.chosetype = 8
        // eslint-disable-next-line eqeqeq
      } else if (this.chosevalue == 'compare') {
        this.chosetype = 9
      }
      // const expre = this.$refs.multipleTable0.getSelection().data
      // textarea = expre
      // expreList.add()
    },
    GeneResult: function() {
      const url = this.baseUrl + '/files/pyExec'
      axios.get(url,{params:{type:this.chosetype}})
        .then(response => {
          console.log(response.data.data)
          this.result = response.data.data
          this.resultList = this.resultList.concat(this.result)
          console.log(this.resultList)
        })
    },
    GeneResultAll: function() {
      const url = this.baseUrl + '/files/anaText'
      const params = {data: JSON.stringify(this.textarea)}
      axios.post(url,params).then(response => {
        console.log(response.data.data)
        this.resultList = response.data.data
        console.log(this.resultList)
      })
    }
  }
}
</script>

<template>
  <div class="box">
    <div class="upload-item">
      发起方：
      <el-upload
        action
        :http-request="UploadFile0"
        :show-file-list="true"
        style="display: inline-block"
        drag
      >
        <el-icon class="el-icon-upload">
          <Upload></Upload>
        </el-icon>
        <div class="el-upload__text">
          将文件拖到此处，或<em>点击上传</em>
        </div>
      </el-upload>
    </div>
    <div class="upload-item">
      协作方：
      <el-upload
        action
        :http-request="UploadFile1"
        :show-file-list="true"
        style="display: inline-block"
        drag
      >
        <el-icon class="el-icon-upload">
          <Upload></Upload>
        </el-icon>
        <div class="el-upload__text">
          将文件拖到此处，或<em>点击上传</em>
        </div>
      </el-upload>
    </div>
    <div class="text-item">
      <i
        class="clearButton el-input__icon el-icon-circle-close el-input__clear"
        @click="handleClear"
      />
      <el-input
        v-model="textarea"
        type="textarea"
        :rows="15"
        placeholder="请输入需要运算的算式内容"
        @clear="handleClear"
      />
    </div>
    <div class="upload-item1">
      <div class="grid-content bg-purple">
        <el-table
          ref="multipleTable0"
          :data="list0"
          border
          fit
          highlight-current-row
          @selection-change="handleSelectionChange0"
        >
          <el-table-column type="selection" align="center" :selectable="selectHandle"/>
          <el-table-column align="center" label="Id" width="95">
            <template v-slot="scope">
              {{ scope.$index }}
            </template>
          </el-table-column>

          <el-table-column label="变量名">
            <template v-slot="scope">
              {{ scope.row }}
            </template>
          </el-table-column>

          <el-table-column label="类型" width="110" align="center">
            <template>
              <el-tag>int</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="upload-item2">
      <div class="grid-content bg-purple">
        <el-table
          ref="multipleTable1"
          :data="list1"
          border
          fit
          highlight-current-row
          @selection-change="handleSelectionChange1"
        >
          <el-table-column type="selection" align="center" :selectable="selectHandle"/>
          <el-table-column align="center" label="Id" width="95">
            <template v-slot="scope">
              {{ scope.$index }}
            </template>
          </el-table-column>

          <el-table-column label="变量名">
            <template v-slot="scope">
              {{ scope.row }}
            </template>
          </el-table-column>

          <el-table-column label="类型" width="110" align="center">
            <template>
              <el-tag>int</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="select-item">
      <el-select
        v-model="chosevalue"
        placeholder="选择算数"
        size="large"
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

    <div class="select-item">
      <el-button type="success" @click="GeneExpre()">生成算式</el-button>
    </div>

    <div class="button-item1">
      <el-scrollbar>
        <el-dropdown>
          <el-button type="success" @click="GeneResult()">计算结果-单</el-button>
        </el-dropdown>
      </el-scrollbar>
    </div>

    <div class="button-item2">
      <el-scrollbar>
        <el-dropdown>
          <el-button type="success" @click="GeneResultAll()">计算结果-多</el-button>
        </el-dropdown>
      </el-scrollbar>
    </div>

    <el-scrollbar class="box-item4">
      <li v-for="(result) in resultList" :key="result" class="scrollbar-demo-item">
        <!--          <p> {{ result.comresult }} </p>-->
        <p v-for="ele in result.comresult.split('~')" :key="ele" class="littleitem">
          {{ele}}<br/>
        </p>
      </li>
    </el-scrollbar>

    <el-scrollbar class="box-item5">
      <li v-for="(result) in resultList" :key="result"  class="scrollbar-demo-item">
        <div>
          <p> 运算符号：{{ result.comtype }} </p>
          <p> 数量级：{{ result.datanum }} </p>
          <p> 运行时间：{{ result.calculate }} </p>
          <p> {{ result.parseJson }} </p>
          <p> 和明文的差：{{ result.differ }} </p>
        </div>
      </li>
    </el-scrollbar>

    <div class="select-itemdown">
      <el-select
        v-model="tovalue"
        placeholder="请选择结果要传输的对象"
        size="large"
        style="width: 240px"
      >
        <el-option
          v-for="tmp in opTo"
          :key="tmp.value"
          :label="tmp.label"
          :value="tmp.value"
        />
      </el-select>
    </div>

    <div class="button-result">
      <el-dropdown>
        <el-button type="success">下载结果</el-button>
      </el-dropdown>
    </div>
  </div>

</template>

<style>
.box {
  display: grid;
  grid-template-columns: 1fr 1fr 3fr;
  grid-row-gap: 10px;
  justify-items: center;
  align-items: center;
}

.box .head-item {
  width: 450px;
  margin-bottom: 10px;
  margin-right: 10px;
  grid-row: 1 / 2;
  grid-column: 1 / 6;
}

.box .text-item {
  position: relative;
  width: 450px;
  margin-bottom: 10px;
  grid-column: 3 / 6;
  grid-row: 1 / 3;
}

.box .upload-item {
  /*width: 100px;*/
  margin-bottom: 10px;
  margin-right: 10px;
}

.box .upload-item1 {
  /*width: 100px;*/
  margin-bottom: 10px;
  margin-right: 10px;
  grid-column: 1 / 1;
}

.box .upload-item2 {
  /*width: 100px;*/
  margin-bottom: 10px;
  margin-right: 10px;
  grid-column: 2 / 2;
}

.box .clearButton {
  position: absolute;
  border-radius: 5px;
  right: 3px;
  z-index: 2;
  border: none;
  top: -3px;
  height: 40px;
  cursor: pointer;
  color: #ccc;
  transform: translateX(2px);
}

.box .clearButton:hover {
  color: #878d99;
}

.box .select-item {
  /*width: 100px;*/
  margin-bottom: 10px;
  margin-right: 10px;
  grid-row:3/3;
}

.box .select-itemdown {
  /*width: 100px;*/
  margin-bottom: 10px;
  margin-right: 10px;
  grid-column: 1 / 3;
}

.box .button-item1 {
  margin-left: 100px;
  justify-self: start;
  grid-column: 3 / 3;
}

.box .button-item2 {
  margin-right: 110px;
  grid-column: 4 / 4;
  justify-self: end;
}

.box .box-item4 {
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

.box .box-item4:before{
  content: "➤ 运行结果";
  position: absolute;
  font-weight: 600;
  font-size: 17px;
  top: 20px;
  left: 17px;
  color: #42b883;
}

.box .box-item5 {
  grid-column: 3 / 6;
  width: 400px;
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

.box .box-item5:before{
  content: "ⓘ 运行日志";
  position: absolute;
  font-weight: 600;
  font-size: 17px;
  top: 20px;
  left: 17px;
  color: #42b883;
}

.box .button-result {
  /*width: 100px;*/
  margin-bottom: 10px;
  margin-right: 10px;
  grid-column: 3 / 6;
}

.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  border-radius: 4px;
  background: #7fdbca;
  color: #0e2231;
}
.scrollbar-demo-item .littleitem{
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  text-align: center;
  border-radius: 4px;
  background: #85db7f;
  color: #0e2231;
}

</style>

