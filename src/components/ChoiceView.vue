<template>
  <div>
    choice = ?<br>
    {{ category }}
  </div>
</template>

<script>
export default {
  name: 'ChoiceView',
  props: {
    category: String,
    choice: Object
  }
}
</script>

<style scoped>

</style>
