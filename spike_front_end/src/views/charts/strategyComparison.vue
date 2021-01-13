<template>
  <div class="chart-container">
    <strategy-comparison height="100%" width="100%" />
  </div>
</template>

<script>
import strategyComparison from '@/components/Strategy/strategyComparison'

export default {
  name: 'MixChart',
  components: { strategyComparison }
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
