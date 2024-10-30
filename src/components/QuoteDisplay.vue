<template>
  <div>
    <div v-if="quote">
      <p>{{ quote.content }}</p>
      <p>
        <em>- {{ quote.author }}</em>
      </p>
    </div>
    <div class="all-btn">
      <button @click="fetchQuote">Generate New Quote</button>
      <button @click="copyQuote" v-if="quote">Copy to Clipboard</button>
      <button @click="clearHistory" v-if="quoteHistory.length">
        Clear History
      </button>
      <button @click="shareOnTelegram" v-if="quote">
        <img class="telegtam-btn" src="../assets/icon-telegram.png" alt="telegram" />
      </button>
      <button @click="shareOnFacebook" v-if="quote"><img src="../assets/icon-facebook.png" alt=""></button>
    </div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <h3>Quote History</h3>
    <ul class="quoteList">
      <li v-for="(item, index) in quoteHistory" :key="index">
        {{ item.content }} - {{ item.author }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getRandomQuote } from "../services/api";

export default {
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
        errorMessage.value = "Failed to fetch quote. Please try again later.";
      }
    };

    const copyQuote = () => {
      navigator.clipboard.writeText(
        `${quote.value.content} - ${quote.value.author}`
      );
      alert("Quote copied to clipboard!");
    };

    const clearHistory = () => {
      quoteHistory.value = [];
    };

    const shareOnTelegram = () => {
      const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
        window.location.href
      )}&text=${encodeURIComponent(
        `"${quote.value.content}" - ${quote.value.author}`
      )}`;
      window.open(telegramUrl, "_blank");
    };

    const shareOnFacebook = () => {
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        window.location.href
      )}&quote=${encodeURIComponent(
        `"${quote.value.content}" - ${quote.value.author}`
      )}`;
      window.open(facebookUrl, "_blank");
    };

    onMounted(fetchQuote);

    return {
      quote,
      fetchQuote,
      copyQuote,
      clearHistory,
      shareOnTelegram,
      shareOnFacebook,
      quoteHistory,
      errorMessage,
    };
  },
};
</script>

<style>
.error {
  color: red;
  font-style: italic;
}

.quoteList {
  text-align: left;
}

ul li {
  margin-bottom: 2rem;
}

.all-btn {
  display: flex;
  justify-content: center;
}

button {
  margin-right: 1rem;
}

img {
  width: 40px;
  height: 40px;
}
</style>
