<template>
  <button @click="share">
    <img :src="icon" :alt="target" />
  </button>
</template>

<script>
import telegramIcon from "../assets/icon-telegram.png";
import facebookIcon from "../assets/icon-facebook.png";

export default {
  props: {
    target: String,
    data: Object,
  },
  computed: {
    icon() {
      return this.target === "Telegram" ? telegramIcon : facebookIcon;
    },
  },
  methods: {
    share() {
      const url =
        this.target === "Telegram"
          ? `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(`"${this.data.content}" - ${this.data.author}`)}`
          : `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(`"${this.data.content}" - ${this.data.author}`)}`;
      window.open(url, "_blank");
    },
  },
};
</script>

<style scoped>
img {
  width: 40px;
  height: 40px;
}
</style>
