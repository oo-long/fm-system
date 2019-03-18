<template>
  <div class="profile">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="8">
        <div class="userAvatar">
          <img :src="user.avatar" class="avatar" alt="">
        </div>
      </el-col>
      <el-col :span="16">
        <div class="userinfo">
          <div class="userinfo-item">
            <i class="fa fa-user"></i>
            <span>{{user.name}}</span>
          </div>
          <div class="userinfo-item">
            <i class="fa fa-cog"></i>
            <span>{{user.identity == "manager" ? "管理员" : "普通员工"}}</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>  
</template>
<script>
export default {
  name: 'profile',
  computed: {
    user(){
      return this.$store.getters.user;
    }
  }

}
</script>

<style scoped>
.profile{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.row-bg{
  width: 100%;
  height: 100%;
}
.userAvatar{
  text-align: center;
  position: relative;
  top: 32%;
}
.userAvatar img{
  width: 120px;
  border-radius: 50%;
}
.userAvatar span{
  display: block;
  text-align: center;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
}
.userinfo{
  height: 100%;
  background-color: #eee;
}
.userinfo-item{
  position: relative;
  top: 30%;
  padding: 26px;
  font-size: 25px;
  color: #333
}
.userinfo-item span{
  margin-left: 15px;
}
</style>
