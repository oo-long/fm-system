<template>
  <header class="head-nav">
    <el-row>
      <el-col :span="6" class="logo-container">
        <span class="title">在线资金管理系统</span>
      </el-col>
      <el-col :span="6" class="user">
        <div class="userinfo">
          <img :src="user.avatar" class="avatar" alt="">
          <div class="welcome">
            <p class="name comename">欢迎</p>
            <p class="name avatarname">{{user.name}}</p>
          </div>
          <span class="username">
            <!-- 下拉箭头 -->
            <el-dropdown trigger="click" @command="setDialogInfo">
              <span class="el-dropdown-link">
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            
          </span>
        </div>
      </el-col>
    </el-row>
  </header>
</template>

<script>
export default {
  name: 'head-nav',
  computed:{
    user(){
      return this.$store.getters.user;
    }
  },
  methods:{
    setDialogInfo(commandItem){
      switch(commandItem){
        case "info": 
          this.showProfile();
          break;
        case "logout":
          this.logout();
          break;
      }
    },
    showProfile(){
      this.$router.push("/profile")
    },
    logout(){
      // 清除token
      localStorage.removeItem('eleToken');
      // 设置 vuex store
      this.$store.dispatch('clearCurrentState');
      this.$router.push('/login')
    }
  }
}
</script>


<style scoped>
.head-nav{
  /* width: 100%; */
  height: 40px;
  min-width: 600px;
  padding: 5px;
  background: #1A1E29;
  color: #fff;
  border-bottom:  1px solid #191C21
}
.logo-container{
  line-height: 40px;
  min-width: 400px;
}
.logo{
  height: 20px;
  width: 20px;
  margin-left: 15px;
  margin-right: 10px;
  vertical-align: middle;
  display: inline-block;
}
.title{
  vertical-align: middle;
  font-size: 16px;
  letter-spacing: 2px;
  padding-left: 1em;
}
.user{
  line-height: 40px;
  text-align: right;
  float: right;
  padding-right: 10px;
}
.avatar{
  width: 35px;
  height: 35px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
  padding: 0 5px;
}
.welcome{
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
}
.name{
  line-height: 16px;
  text-align: center;
  font-size: 14px;
}
.comename{
  font-size: 12px;
}
.avatarname{
  color: #7984F3;
  font-weight: bolder;
}
.username{
  cursor: pointer;
  margin-right: 5px;
}
.el-dropdown{
  color: #fff
}
</style>
