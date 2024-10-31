<template>
  <div>
    <div v-if="quote">
      <p>{{ quote.content }}</p>
      <p><em>- {{ quote.author }}</em></p>
    </div>
    <div class="all-btn">
      <button @click="fetchQuote">Generate New Quote</button>
      <button @click="copyQuote" v-if="quote">Copy to Clipboard</button>
      <button @click="clearHistory" v-if="quoteHistory.length">Clear History</button>
      <ShareButton v-if="quote" target="Telegram" :data="quote" />
      <ShareButton v-if="quote" target="Facebook" :data="quote" />
    </div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <QuoteHistory :history="quoteHistory" />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import ShareButton from "./ShareButton.vue";
import QuoteHistory from "./QuoteHistory.vue";
import { getRandomQuote } from "../services/api";

export default {
  components: { ShareButton, QuoteHistory },
  setup() {
    const quote = ref(null);
    const quoteHistory = ref([]);
    const errorMessage = ref("");

    const fetchQuote = async () => {
      try {
        errorMessage.value = "";
        const newQuote = await getRandomQuote();
        quote.value = newQuote;
        quoteHistory.value.unshift(newQuote);
      } catch (error) {
        console.error("Error fetching quote:", error);
        errorMessage.value = "Failed to fetch quote. Please try again later.";
      }
    };

    const copyQuote = () => {
      navigator.clipboard.writeText(`${quote.value.content} - ${quote.value.author}`);
      alert("Quote copied to clipboard!");
    };

    const clearHistory = () => {
      quoteHistory.value = [];
    };

    onMounted(fetchQuote);

    return {
      quote,
      fetchQuote,
      copyQuote,
      clearHistory,
      quoteHistory,
      errorMessage,
    };
  },
};
</script>

<style scoped>
.error {
  color: red;
  font-style: italic;
}
.all-btn {
  display: flex;
  justify-content: center;
}
button {
  margin-right: 1rem;
}
</style>
