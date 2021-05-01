<template>
  <div>
    <ChoiceView category="lunch" :choice="choice"/>
  </div>
</template>

<script>
import ChoiceView from '@/components/ChoiceView'

export default {
  name: 'Lunch',
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
