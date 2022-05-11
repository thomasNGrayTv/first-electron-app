<script setup>
import { ref, onMounted } from "vue";
import Card from "./Card.vue";
import useAxiosHandler from "../composables/useAxiosHandler";
import { mainStore } from "../stores/mainStore";

const store = mainStore();

try {
  if (store.cards.length === 0) {
    const getCardsQuotes = await useAxiosHandler().get("/quotes");
    store.setCards(getCardsQuotes.data.results);
  }
} catch (err) {
  console.log(err);
}
</script>

<template>
  <div class="cards relative flex">
    <Card
      v-for="(card, index) in store.cards"
      :key="card"
      :card="card"
      :data-card="JSON.stringify(card)"
      :style="{
        top: index - 0.5 + 'em',
        zIndex: 22 - index,
        position: 'absolute',
      }"
      :id="'card' + index"
    ></Card>
    <div
      class="absolute leftCustom1 widthCustom1 hCustom border-2 border-dashed dropzone saveDropZone m-4"
    >
      <h2 class="text-4xl text-center">Save</h2>
    </div>
    <div
      class="absolute leftCustom2 widthCustom2 hCustom border-2 border-dashed dropzone trashDropZone m-4"
    >
      <h2 class="text-4xl text-center">Trash</h2>
    </div>
  </div>
</template>

<style>
.cards {
  top: 2em;
  left: 1em;
  width: 100%;
  min-width: 95em;
  height: 100%;
}

.leftCustom1 {
  left: 20em;
}
.leftCustom2 {
  left: 40em;
}
.widthCustom1 {
  width: 19em;
}
.widthCustom2 {
  width: 19em;
}
.hCustom {
  height: 30em;
}
</style>
