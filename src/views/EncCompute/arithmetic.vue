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
        baseUrl: 'http://127.0.0.1:8000',
        textarea: '',
        comnum: 0,
        myvalue: '',
        selectionKey0: [],
        selectionKey1: [],
        dataonLineListSelection0: [],
        dataonLineListSelection1: [],
        modelchose: '1',
        options: [{
          value: 'add',
          label: 'add'
        }, {
          value: 'mul',
          label: 'mul'
        }, {
          value: 'index',
          label: 'index'
        }, {
          value: 'ln',
          label: 'ln'
        }, {
          value: 'poly',
          label: 'ploy'
        }],
        optionsMali: [{
          value: 'add',
          label: 'add'
        }, {
          value: 'sub',
          label: 'sub'
        }, {
          value: 'mul',
          label: 'mul'
        }, {
          value: 'div',
          label: 'div'
        }, {
          value: 'cheapadd',
          label: 'cheapadd'
        }, {
          value: 'cheapdiv',
          label: 'cheapdiv'
        }, {
          value: 'exp',
          label: 'exp'
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
        Maliresult: {
        share_alice_time: '',
          share_bob_time: '',
          verify_alice_time: '',
          verify_bob_time: '',
          comresult: ''
      },
      resultList: [],
        MaliresultList: []
      }
    },
    methods: {
      handleClear() {
        this.textarea = ''
      },
      MaliUploadFile0(item) {
        const FormDatas = new FormData()
        FormDatas.append('file', item.file)
        FormDatas.append('party', 'Alice')
        FormDatas.append('id', 1)
        axios.post('http://127.0.0.1:8000/update', FormDatas).then((response) => {
          console.log(response.data)
          // this.$message.success(response.data.message)
        })
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
        if (this.modelchose === '2') {
          this.MaliUploadFile0(item)
        }
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
      MaliUploadFile1(item) {
        const FormDatas = new FormData()
        FormDatas.append('file', item.file)
        FormDatas.append('party', 'Bob')
        FormDatas.append('id', 1)
        axios.post('http://127.0.0.1:8000/update', FormDatas).then((response) => {
          console.log(response.data)
          // this.$message.success(response.data.message)
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
        if (this.modelchose === '2') {
          this.MaliUploadFile1(item)
        }
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
        if (this.modelchose === '1') {
          if (this.chosevalue === 'add') {
            this.chosetype = 1
            // eslint-disable-next-line eqeqeq
          } else if (this.chosevalue == 'mul') {
            this.chosetype = 2
            // eslint-disable-next-line eqeqeq
          } else if (this.chosevalue == 'index') {
            this.chosetype = 3
            // eslint-disable-next-line eqeqeq
          } else if (this.chosevalue == 'ln') {
            this.chosetype = 4
            // eslint-disable-next-line eqeqeq
          } else if (this.chosevalue == 'poly') {
            this.chosetype = 6
          }
        } else {
          if (this.chosevalue === 'add') {
            this.chosetype = 1
            // eslint-disable-next-line eqeqeq
          } else if (this.chosevalue === 'sub') {
            this.chosetype = 2
            // eslint-disable-next-line eqeqeq
          } else if (this.chosevalue === 'mul') {
            this.chosetype = 3
            // eslint-disable-next-line eqeqeq
          } else if (this.chosevalue === 'div') {
            this.chosetype = 4
            // eslint-disable-next-line eqeqeq
          } else if (this.chosevalue === 'cheapdiv') {
            this.chosetype = 5
          } else if (this.chosevalue === 'exp') {
            this.chosetype = 6
          }
        }
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
      },
      MaliGeneResult: async function() {
        this.Maliresult = {}
        await this.GetMaliTime()
        this.GetMaliResult()
        this.MaliresultList = this.MaliresultList.concat(this.Maliresult)
        console.log(this.MaliresultList)
      },
      GetMaliTime: async function() {
        await axios.get('http://1127.0.0.1:8000/verify', {params: {id: 1, operate: this.chosetype}}).
        then((response) => {
          console.log(response.data.share_info.output_alice)
          this.Maliresult.share_alice_time = response.data.share_info.output_alice.total_time
          this.Maliresult.share_bob_time = response.data.share_info.output_bob.total_time
          this.Maliresult.verify_alice_time = response.data.verify_info.output_alice.total_time
          this.Maliresult.verify_bob_time = response.data.verify_info.output_alice.total_time
        })
      },
      GetMaliResult: async function() {
        axios.get('http://127.0.0.1:8000/result', {params: {id: 1}}).
        then((response) => {
          // console.log(response.data)
          this.Maliresult.comresult = response.data
        })
      }
    }
  }
</script>

<template>
  <div class="box">
    <div class="chosemodel-item">
      请选择安全水平：
      <el-radio v-model="modelchose" label="1">半诚实</el-radio>
      <el-radio v-model="modelchose" label="2">恶意</el-radio>
    </div>
    <div class="ari-upload-item">
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
    <div class="ari-upload-item">
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
    <div class="ari-text-item">
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
    <div class="ari-upload-item1">
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
    <div class="ari-upload-item2">
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

    <div class="ari-select-item">
      <el-select
        v-model="chosevalue"
        placeholder="选择算数"
        size="large"
        style="width: 240px"
      >
        <el-option
          v-for="item in options"
          v-if="modelchose=='1'"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
        <el-option
          v-for="item in optionsMali"
          v-if="modelchose=='2'"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>

    <div class="ari-select-item">
      <el-button type="success" @click="GeneExpre()">生成算式</el-button>
    </div>

    <div v-if="modelchose=='1'" class="ari-button-item1">
      <el-scrollbar>
        <el-dropdown>
          <el-button type="success" @click="GeneResult()">计算结果-单</el-button>
        </el-dropdown>
      </el-scrollbar>
    </div>

    <div v-if="modelchose=='1'" class="ari-button-item2">
      <el-scrollbar>
        <el-dropdown>
          <el-button type="success" @click="GeneResultAll()">计算结果-多</el-button>
        </el-dropdown>
      </el-scrollbar>
    </div>

    <div v-if="modelchose=='2'" class="ari-button-item">
      <el-scrollbar>
        <el-dropdown>
          <el-button type="success" @click="MaliGeneResult()">计算结果</el-button>
        </el-dropdown>
      </el-scrollbar>
    </div>

    <el-scrollbar class="ari-box-item4">
      <div v-if="modelchose=='1'">
        <li v-for="(result) in resultList" :key="result" class="ari-scrollbar-demo-item">
          <p v-for="ele in result.comresult.split('~')" :key="ele" class="littleitem">
            {{ ele }}<br>
          </p>
        </li>
      </div>
      <div v-if="modelchose=='2'">
        <li v-for="(resultm) in MaliresultList" :key="resultm" class="ari-scrollbar-demo-item">
          {{resultm.comresult}}
        </li>
      </div>
    </el-scrollbar>

    <el-scrollbar class="ari-box-item5">
      <div v-if="modelchose=='1'">
        <li v-for="(result) in resultList" :key="result" class="ari-scrollbar-demo-item">
          <div>
            <p> 运算符号：{{ result.comtype }} </p>
            <p> 数量级：{{ result.datanum }} </p>
            <p> 运行时间：{{ result.calculate }} </p>
            <p> {{ result.parseJson }} </p>
            <p> 和明文的差：{{ result.differ }} </p>
          </div>
        </li>
      </div>
      <div v-if="modelchose=='2'">
        <li v-for="(resultm) in MaliresultList" :key="resultm" class="ari-scrollbar-demo-item">
          <p>
            share_info.output_alice.totol_time: {{ resultm.share_alice_time }} <br>
            share_info.output_bob.totol_time: {{ resultm.share_bob_time }} <br>
            verify_info.output_alice.totol_time: {{ resultm.verify_alice_time }} <br>
            verify_info.output_bob.totol_time: {{ resultm.verify_bob_time }}
          </p>
        </li>
      </div>
    </el-scrollbar>

    <div class="ari-select-itemdown">
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

    <div class="ari-button-result">
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
  justify-items: center;
  align-items: center;
}

.box .chosemodel-item {
  grid-row:1/1;
  grid-column: 1/3;
  background: #bee1dc;
  width: max-content;
}

.box .ari-text-item {
  position: relative;
  width: 450px;
  border: solid 1px #7c7c7c;
  border-radius: 8px;
  margin-bottom: 10px;
  grid-column: 3 / 6;
  grid-row: 2 / 4;
}

.box .ari-upload-item {
  /*width: 100px;*/
  margin-bottom: 10px;
  margin-right: 10px;
  grid-row:2;
}

.box .ari-upload-item1 {
  /*width: 100px;*/
  margin-right: 10px;
  grid-column: 1 / 1;
  grid-row:3/3;
}

.box .ari-upload-item2 {
  /*width: 100px;*/
  margin-right: 10px;
  grid-column: 2 / 2;
  grid-row:3/3;
}

.box .ari-clearButton {
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

.box .ari-clearButton:hover {
  color: #878d99;
}

.box .ari-select-item {
  height: 10px;
  grid-row: 4 / 4;
  align-self: start;
}

.box .ari-select-itemdown {
  /*width: 100px;*/
  margin-bottom: 10px;
  margin-right: 10px;
  grid-column: 1 / 3;
}

.box .ari-button-item {
  justify-self: center;
  grid-column: 3 / 4;
  grid-row: 4 / 4;
  align-self: center;
}

.box .ari-button-item1 {
  margin-left: 100px;
  justify-self: start;
  grid-column: 3 / 3;
  grid-row: 4 / 4;
  align-self: center;
}

.box .ari-button-item2 {
  margin-right: 110px;
  grid-column: 4 / 4;
  grid-row: 4 / 4;
  justify-self: end;
  align-self: center;
}

.box .ari-box-item4 {
  align-self: start;
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

.box .ari-box-item4:before{
  content: "➤ 运行结果";
  position: absolute;
  font-weight: 600;
  font-size: 17px;
  top: 20px;
  left: 17px;
  color: #42b883;
}

.box .ari-box-item5 {
  align-self: start;
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

.box .ari-box-item5:before{
  content: "ⓘ 运行日志";
  position: absolute;
  font-weight: 600;
  font-size: 17px;
  top: 20px;
  left: 17px;
  color: #42b883;
}

.box .ari-button-result {
  /*width: 100px;*/
  //margin-bottom: 10px;
  margin-right: 10px;
  grid-column: 3 / 6;
}

.ari-scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  border-radius: 4px;
  background: #bee1dc;
  color: #0e2231;
  //word-break: break-all;
  //word-wrap: break-word
}
.ari-scrollbar-demo-item .littleitem{
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

