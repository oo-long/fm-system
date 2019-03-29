<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">在线后台管理系统</span>
        <el-form :model="registerUser" :rules="rules" ref="registerForm"
        label-width="90px" class="registerForm">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="registerUser.name" placeholder="请输入用户名">
            </el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="registerUser.email" placeholder="请输入邮箱">
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="registerUser.password" placeholder="请输入密码">
            </el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input type="password" v-model="registerUser.confirmPassword" placeholder="请再次输入密码">
            </el-input>
          </el-form-item>
          <el-form-item label="选择身份">
            <el-select v-model="registerUser.identity" placeholder="请选择身份">
              <el-option label="管理员" value="manager"></el-option>
              <el-option label="员工" value="employee"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="submitForm('registerForm')">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </section>
    <div class="text">
      <div>JSFU<b class="pink">N</b></div><div class="indent1">.CL<b class="purple">U</b>B</div>
    </div>  
    <div class="font">
      <span class="fs-11">FONT</span>
      <span class="fs-28">Montserrat</span>
    </div>
    <div class="cool">
      MR.EF
    </div>
    <div class="name">
      JSFUN.CLUB
    </div>
  </div>
</template>

<script>
  export default{
    name: 'register',
    components: {},
    data(){
      var validateConfirmPassword = (rule, value, callback) => {
        if(value !== this.registerUser.password){
          callback(new Error('两次输入密码不一致！'));
        }else{
          callback()
        }
      }
      return {
        registerUser:{
          name:'',
          email:'',
          password:'',
          confirmPassword: '',
          identity: ''
        },
        rules:{
          name:[
            {
              required: true,
              message: "用户名不能为空",
              trigger: "blur"
            },
            {
              min: 2,
              max: 30,
              message: "长度在2到30个字符之间",
              trigger: "blur"
            }
          ],
          email:[
            {
              type: "email",
              required: true,
              message: "邮箱格式不正确",
              trigger: "blur"
            }
          ],
          password:[
            {
              required: true,
              message: "密码不能为空",
              trigger: "blur"
            },
            {
              min: 6,
              max: 30,
              message: "长度在6到30位之间",
              trigger: "blur"
            }
          ],
          confirmPassword:[
            {
              required: true,
              message: "请再次输入密码",
              trigger: "blur"
            },
            {
              validator: validateConfirmPassword,
              trigger: "blur"
            }
          ]

        }
      }

    },
    methods:{
      submitForm(formName){
        this.$refs[formName].validate(valid => {
          if(valid){
            this.$axios.post("/api/users/register",this.registerUser)
            .then(res => {
              // 注册成功
              this.$message({
                message: "账号注册成功!",
                type: 'success'
              });
              setTimeout(()=>{
                this.$router.push('/login');
              },300)
            }).catch(err => {
              // if(err.response.status == 400){
              // this.$message({
              //   message: "该账号已注册，请直接登录",
              //   type: 'warning'
              // });
              // setTimeout(()=>{
              //   this.$router.push('/login');
              // },600);
              // return false
              // }
              
              // 注册失败
              this.$message({
                message: "网络错误，请稍后重试",
                type: 'error'
              })
            })
            
          }else{
            return false;
          }
        })
      }
    }
  }
</script>

<style>
.register{
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.register .form_container{
  width: 370px;
  height: 210px;
  position: absolute;
  top: 21%;
  right: 19%;
  border-radius: 5px;
  text-align: center;
  z-index: 99;
}
.form_container .manage_tip .title{
  font-size: 20px;
  color: #fff;
  letter-spacing: 1px
}
.register .registerForm{
  margin-top: 21px;
  background-color: rgba(255,255,255,.1);
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
}
.register .submit_btn{
  width: 100%;
  background-color: #7984F3;
  border-color: #7984F3;
}
.register .submit_btn{
  width: 100%;
}
.registerForm label.el-form-item__label{
  color: #838DA1;
}
.register .text{
  position: absolute;
  top: 33%;
  left: 19%;
  color: #fff;
  font-size: 115px;
  font-family: "montserratalternates-regular";
  line-height: normal;
}
.register .pink{
  font-weight: normal;
  color: #F27D91
}
.register .purple{
  font-weight: normal;
  color: #7984F3
}
.register .indent1{
  text-indent: 1em;
}
.register .font{
  position: absolute;
  left: 17%;
  bottom: 7%;
  color: #fff;
  font-family: "montserrat-regular";
  line-height: normal;
}
.register .fs-11{
  font-size: 11px;
  letter-spacing: 2px;
  color: #838DA1
}
.register .fs-28{
  font-size: 28px;
  margin-left: 12px;
  letter-spacing: 1px;
}
.register .cool{
  position: absolute;
  right: 17%;
  bottom: 7%;
  color: #fff;
  font-size: 26px;
  letter-spacing: 1px;
  font-family: "montserratalternates-regular";
  line-height: normal;
}
.register .name{
  position: absolute;
  right: 17%;
  top: 7%;
  color: #fff;
  font-size: 13px;
  letter-spacing: 1px;
  font-family: "montserrat-light";
  line-height: normal;
}
</style>
