<template>
  <div class="fill-container">
    <div>
      <!-- :ref="add_data" -->
      <el-form :inline="true" :model="siftData">
        <!-- 筛选框 -->
        <el-form-item label="按照时间筛选：">
          <el-date-picker
            v-model="siftData.startTime"
            type="datetime"
            placeholder="选择开始时间"
            default-time="00:00:00">
          </el-date-picker>
          --
          <el-date-picker
            v-model="siftData.endTime"
            type="datetime"
            placeholder="选择结束时间"
            default-time="12:00:00">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="el-icon-search" @click="handleSift()">筛选</el-button>
        </el-form-item>
        <el-form-item class="btn-right">
          <el-button type="primary" size="small" icon="el-icon-plus" v-if="user.identity == 'manager'" @click="handleAdd()">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-container">
      <el-table
        v-if="tableData.length > 0"
        :data="tableData"
        max-height="516"
        stripe
        @sort-change="sortChange"
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="60">
        </el-table-column>
        <el-table-column
          prop="date"
          label="创建时间"
          width="250"
          align="center"
          sortable="custom">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left:10px">{{scope.row.date}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="收支类型"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="description"
          label="收支描述"
          width="200"
          align="center">
        </el-table-column>
        <el-table-column
          prop="income"
          label="收入"
          width="160"
          sortable="custom"
          align="center">
          <template slot-scope="scope">
            <span style="color:#00d053">+ {{scope.row.income}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="expend"
          label="支出"
          width="160"
          sortable="custom"
          align="center">
          <template slot-scope="scope">
            <span style="color:#f56767">- {{scope.row.expend}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="cash"
          label="账户现金"
          width="160"
          sortable="custom"
          align="center">
          <template slot-scope="scope">
            <span style="color:#4db3ff">{{scope.row.cash}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          width="220"
          align="center">
        </el-table-column>
        <el-table-column>
        </el-table-column>
        <el-table-column 
          prop="operation" 
          align="center" 
          fixed="right"
          width="240"
          v-if="user.identity == 'manager'"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="primary"
              icon="el-icon-edit-outline"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="small"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row>
        <el-col :span="24" >
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="paginations.page_index"
              :page-sizes="paginations.page_sizes"
              :page-size="paginations.page_size"
              :layout="paginations.layout"
              :total="paginations.total">

            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <Dialog :dialog="dialog" :formData="formData" :formatTypeList="formatTypeList" @update="getFundList"></Dialog>
  </div>
</template>
<script>
import Dialog from "../components/Dialog"
export default {
  name: "fund-list",
  components: {
    Dialog
  },
  data(){
    return{
      // layout 属性 必须写正确
      paginations: {
        page_index: 1,
        total: 0,
        page_size: 5,
        page_sizes: [5, 10, 15, 20],
        layout: "total, sizes, prev, pager, next, jumper"
      },
      // 子组件(Dialog)数据提升至父组件
      formData: {
        type: "",
        description: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      },
      tableData:[],
      allTableData: [],
      siftData: {
        startTime: "",
        endTime: ""
      },
      siftedTableData: [],
      sortedTableData: [],
      dialog: {
        show: false,
        title: "",
        option: "edit"
      },
      formatTypeList: [
        "提现","提现手续费","充值","优惠券","转账"
      ]
    }
  },
  computed: {
    user(){
      return this.$store.getters.user;
    },
    filterFormatTypeList(){
      return this.formatTypeList.map((item,index) => {
	      return {text: item, value: item}
      })
    }
  },
  created(){
    this.getFundList()
  },
  methods:{
    getFundList(){
      // 获取表格数据
      this.$axios.get("/api/profile")
      .then(res => {
        this.allTableData = res.data;
        this.siftedTableData = res.data;
        this.sortedTableData = res.data;
        // 设置分页数据
        this.setPaginations();
      }).catch(
        err => console.log(err)
      )
    },
    handleEdit(index,row){
      // 编辑
      this.dialog = {
        show: true,
        title: "修改资金信息",
        option: "edit"
      },
      this.formData = {
        type: row.type,
        description: row.description,
        income: row.income,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark,
        id: row._id
      }
    },
    handleDelete(index,row){
      this.$confirm('此操作将永久删除该条记录，是否继续？','提示',{
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warining"
      }).then(()=>{
        this.$axios.delete(`/api/profile/delete/${row._id}`)
            .then(res => {
              this.$message({
              type: "success",
              message: "删除成功！"
            });
            this.getFundList();
          }).catch(err => {
            this.$message({
              message: "网络错误，删除失败",
              type: "error"
            })
          })
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          })
      })      
    },
    handleAdd(){
      // 添加
      this.dialog = {
        show: true,
        title: "添加资金信息",
        option: "add"
      },
      this.formData = {
        type: "",
        description: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      }
    },
    setPaginations(){
      // 分页属性设置
      this.paginations.total = this.allTableData.length;
      this.paginations.page_index = 1;
      // this.paginations.page_size = 5;
      // 设置默认的分页数据，过滤分页数据
      this.tableData = this.allTableData.filter((item,index) => {
        return index < this.paginations.page_size;
      })
    },
    handleSizeChange(page_size){
      // 切换size
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      // 过滤分页数据
      this.tableData = this.allTableData.filter((item,index) => {
        return index < page_size;
      })
    },
    handleCurrentChange(page){
      // 获取当前页下标
      let index = this.paginations.page_size * (page - 1);
      // 数据的总数
      let nums = this.paginations.page_size * page;
      // 容器
      let tables = [];

      for(let i = index; i< nums; i++){
        if(this.allTableData[i]){
          tables.push(this.allTableData[i]);
        }
        this.tableData = tables;
      }
    },
    handleSift(){
      // 筛选
      if(!this.siftData.startTime || !this.siftData.endTime){
        this.$message({
          type: "warning",
          message: "请选择时间区间"
        });
        this.getFundList();
        return;
      }
      const startTime = this.siftData.startTime.getTime();
      const endTime = this.siftData.endTime.getTime();
      
      if(startTime > endTime){
        this.$message({
          type: "warning",
          message: "开始时间应小于或等于结束时间"
        });
        this.siftData.startTime = null;
        this.siftData.endTime = null;
        return;
      }

      this.allTableData = this.siftedTableData.filter(item => {
        let date = new Date(item.date);
        let time = date.getTime();
        return time  >= startTime && time <=endTime;
      });
      //分页数据调用
      this.setPaginations();
    },
    sortChange({column,prop,order}){
      if(order == null){
        return;
      }
      this.allTableData = this.allTableData.sort(this.sortCompare(prop,order));
      this.setPaginations();
    },
    sortCompare(property,order){
      return function(a,b){
        let value1 = property == 'date'? new Date(a[property]).getTime() : a[property];
        let value2 = property == 'date'? new Date(b[property]).getTime() : b[property];
        if(order == 'descending'){
          return value2 - value1;
        }else{
          return value1 - value2;
        }
      }
    }
  }
}
</script>

<style scoped>
.fill-container{
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btn-right{
  float: right;
}
.pagination{
  margin-top: 10px;
  text-align: right;
}
</style>
