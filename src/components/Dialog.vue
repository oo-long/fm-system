<template>
  <div class="dialog">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false">
      <div class="form">
        <el-form
          ref="form"
          :model="formData"
          :rules="form_rules"
          label-width="120px"
          style="margin:10px;width:auto">
          <el-form-item label="收支类型：">
            <el-select v-model="formData.type" placeholder="选择类型">
              <el-option 
              v-for="(formtype,index) in formatTypeList" 
              :key="index" 
              :label="formtype"
              :value="formtype">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="description" label="收支描述：">
            <el-input type="description" v-model="formData.description"></el-input>
          </el-form-item>
          <el-form-item prop="income" label="收入：">
            <el-input type="income" v-model="formData.income"></el-input>
          </el-form-item>
          <el-form-item prop="expend" label="支出：">
            <el-input type="expend" v-model="formData.expend"></el-input>
          </el-form-item>
          <el-form-item prop="cash" label="现金：">
            <el-input type="cash" v-model="formData.cash"></el-input>
          </el-form-item>
          <el-form-item prop="remark" label="备注：">
            <el-input type="textarea" v-model="formData.remark"></el-input>
          </el-form-item>
          <el-form-item class="text-right">
            <el-button type="primary" @click="onSubmit('form')">提交</el-button>
            <el-button @click="handleCancel('form')">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "data-dialog",
  props: {
    dialog: Object,
    formData: Object,
    formatTypeList: Array
  },
  data(){
    return {
      form_rules: {
        description: [
          {
            required: true,
            message: "收支描述不能为空",
            trigger: "blur"
          }
        ],
        income: [
          {
            required: true,
            message: "收入金额不能为空",
            trigger: "blur"
          }
        ],
        expend: [
          {
            required: true,
            message: "支出金额不能为空",
            trigger: "blur"
          }
        ],
        cash: [
          {
            required: true,
            message: "账户现金不能为空",
            trigger: "blur"
          }
        ]
      }
    }
  },
  methods: {
    onSubmit(form){
      this.$refs[form].validate(valid => {
        if (valid){
          const url = this.dialog.option == "add" ? "add" : `edit/${this.formData.id}`;
          const type = this.dialog.option == "add" ? "添加" : "修改";
          this.$axios.post(`/api/profile/${url}`, this.formData)
          .then(res => {
            // 添加成功 OR 修改成功
            this.$message({
              message: `收支数据${type}成功`,
              type: "success"
            });
            if(this.dialog.option == "add"){
              this.$refs[form].resetFields();
              this.$emit("update")
            }
            if(this.dialog.option == "edit"){
              this.$emit("update")
            }
            this.dialog.show = false;
       
          }).catch(err => {
            this.$message({
              message: "网络错误,添加失败,请稍后重试",
              type: "error"
            })
          })
        }
      })
    },
    handleCancel(form){
      this.$refs[form].resetFields();
      this.dialog.show = false;
    }
  }
}
</script>

<style scoped>

</style>
