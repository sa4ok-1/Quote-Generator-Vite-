<template>
  <div>
    <h3>Quote History</h3>
    <ul class="quoteList">
      <li v-for="(item, index) in history" :key="index">
        {{ item.content }} - {{ item.author }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    history: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.quoteList {
  text-align: left;
}
ul li {
  margin-bottom: 2rem;
}
</style>
