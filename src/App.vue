<template>
  <VHeader />
  <SearchBar />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SearchBar from './components/SearchBar.vue';
import VHeader from './components/VHeader.vue';

export default defineComponent({
  name: 'App',
  components: {
    SearchBar,
    VHeader,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
