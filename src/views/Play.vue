<template>
  <div>
    <ChoiceView category="play" :choice="choice"/>
  </div>
</template>

<script>
import ChoiceView from '@/components/ChoiceView'

export default {
  name: 'Play',
  components: { ChoiceView },
  data: () => {
    return {
      choice: null
    }
  }
}
</script>

<style scoped>

</style>
