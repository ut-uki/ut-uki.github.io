<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png"><br>
    <router-link :to="links">{{msg}}</router-link>
  </div>
</template>

<script>
export default {
  name: 'Img',
  props: {
    links: String,
    msg: String
  }
}
</script>

<style lang="scss">
img {
  text-align: center;
}

</style>
