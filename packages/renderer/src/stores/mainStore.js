import { defineStore } from "pinia";

export const mainStore = defineStore({
  id: "mainStore",
  state: () => {
    return {
      cards: [],
      savedCards: [],
      currentZ: 20,
    };
  },
  getters: {},
  actions: {
    incrementZ() {
      this.currentZ++;
    },
    setCards(cards) {
      this.cards = cards;
    },
    addToSavedCards(card) {
      if (!this.savedCards.some((c) => c._id == card._id)) {
        this.savedCards.push(card);
        this.cards = this.cards.filter((c) => c._id !== card._id);
      }
    },
    removeFromCards(id) {
      this.cards = this.cards.filter((card) => card._id !== id);
    },
  },
});
