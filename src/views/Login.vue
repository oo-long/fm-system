<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">在线后台管理系统</span>
        <el-form :model="loginUser" :rules="rules" ref="loginForm"
        label-width="90px" class="loginForm">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="loginUser.email" placeholder="请输入邮箱">
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginUser.password" placeholder="请输入密码">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="submitForm('loginForm')">登录</el-button>
          </el-form-item>
          <div class="tiparea">
            <p>还没有账号？现在<router-link to='/register'>注册</router-link></p>
          </div>
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
import jwt_decode from 'jwt-decode'
export default {
  name: 'login',
  components: {},
  data(){
    return{
      loginUser:{
        email:'',
        password:''
      },
      rules:{
        email:[
          {
            type:"email",
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
        ]
      }
    }
  },
  methods:{
    submitForm(formName){
      this.$refs[formName].validate(valid => {
        if(valid){
          this.$axios.post('/api/users/login',this.loginUser)
          .then(res => {
            this.$message({
              message:'登录成功',
              type:'success'
            })
            //  拿到token
            const { token } = res.data
            // 存储到localstorage
            localStorage.setItem('eleToken', token)
            // 解析token
            const decoded = jwt_decode(token)
            // console.log(decoded)
            // token解析后存储到vuex中
            this.$store.dispatch("setAuthenticated",!this.isEmpty(decoded))
            this.$store.dispatch("setUser",decoded)
            setTimeout(()=>{
              this.$router.push('/index')
            },300)
          })
          .catch(error=>{
            if(error.response.status){
            this.$message({
              message:'网络错误，请稍后重试',
              type:'error'
            })
            };
            // if(error.response.status == 400 || error.response.status == 404 ){
            // this.$message({
            //   message:'账号或密码错误',
            //   type:'warning'
            // })
            // }

          })
        }else{
          return false
        }
      })
    },
    isEmpty(value){
      return (
        value === undefined || 
        value === null || 
        (typeof value === "object" && Object.keys(value).length === 0) || 
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
}
</script>
<style>
.login{
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100% 
}
.login .form_container{
  width: 370px;
  height: 210px;
  position: absolute;
  top: 30%;
  right: 19%;
  /* padding: 25px; */
  /* margin-left: -210px; */
  border-radius: 5px;
  text-align: center;
  z-index: 99;
}
.form_container .manage_tip .title{
  /* font-weight: bold; */
  font-size: 20px;
  color: #fff;
  letter-spacing: 1px
}
.login .loginForm{
  margin-top: 21px;
  background-color: rgba(255,255,255,.1);
  padding: 20px 40px 20px 0;
  border-radius: 5px;
}
.login .submit_btn{
  width: 100%;
  background-color: #7984F3;
  border-color: #7984F3;
}
.login .tiparea{
  text-align: right;
  font-size: 12px;
  color: #838DA1
}
.login .tiparea p a{
  color: #7984F3;
  text-decoration: none;
}
.loginForm label.el-form-item__label{
  color: #838DA1;
}
.login .text{
  position: absolute;
  top: 33%;
  left: 19%;
  color: #fff;
  font-size: 115px;
  font-family: "montserratalternates-regular";
  line-height: normal;
}
.login .pink{
  font-weight: normal;
  color: #F27D91
}
.login .purple{
  font-weight: normal;
  color: #7984F3
}
.login .indent1{
  text-indent: 1em;
}
.login .font{
  position: absolute;
  left: 17%;
  bottom: 7%;
  color: #fff;
  font-family: "montserrat-regular";
  line-height: normal;
}
.login .fs-11{
  font-size: 11px;
  letter-spacing: 2px;
  color: #838DA1
}
.login .fs-28{
  font-size: 28px;
  margin-left: 12px;
  letter-spacing: 1px;
}
.login .cool{
  position: absolute;
  right: 17%;
  bottom: 7%;
  color: #fff;
  font-size: 26px;
  letter-spacing: 1px;
  font-family: "montserratalternates-regular";
  line-height: normal;
}
.login .name{
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
