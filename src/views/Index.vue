<template>
  <div class="index">
    <HeadNav>
      <router-view></router-view>
    </HeadNav>
  </div>
</template>

<script>
  import HeadNav from '../components/HeadNav'
  export default{
    name: "index",
    components: {
      HeadNav
    }
  }
</script>
