<template>
  <div class="chart-container">
    <shipan height="100%" width="100%" />
  </div>
</template>

<script>
import Chubei from '@/components/Strategy/chubei'

export default {
  name: 'MixChart',
  components: { Chubei }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
