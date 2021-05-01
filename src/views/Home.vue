<template>
  <div class="home">
    <ImageLink links="/lunch" msg="Lunchを決める"/>
    <ImageLink links="/play" msg="Playを決める"/>
  </div>
</template>

<script>
// @ is an alias to /src
import ImageLink from '@/components/ImageLink'

export default {
  name: 'Home',
  components: {
    ImageLink
  }
}
</script>

<style lang="scss">

</style>
