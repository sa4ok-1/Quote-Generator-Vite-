<template>
  <div id="app">
    <h1>Random Quote Generator</h1>
    <QuoteDisplay />
  </div>
</template>

<script>
import QuoteDisplay from "./components/QuoteDisplay.vue";

export default {
  components: { QuoteDisplay },
};
</script>

<style scoped>
#app {
  text-align: center;
}
</style>
