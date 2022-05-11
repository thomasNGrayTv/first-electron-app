<script setup>
import CardStack from "../components/CardStack.vue";
</script>

<template>
  <router-link class="underline ml-2" :to="{ name: 'saved-quotes' }"
    >Saved Quotes</router-link
  >
  <h1 class="text-4xl my-4 mx-2">Drag Quotes to Save or Trash</h1>
  <Suspense>
    <template #default>
      <CardStack></CardStack>
    </template>
    <template #fallback>
      <div class="loaderContainer relative flex w-24 h-7">
        Loading Cards....
      </div>
    </template>
  </Suspense>
</template>

<style>
.loaderContainer {
  top: 2em;
  left: 1em;
  width: 98%;
  height: 100%;
}
</style>
