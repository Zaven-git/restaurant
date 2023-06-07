<script setup lang="ts">
import { withDefaults, defineProps } from 'vue';

interface Props {
  background?: string;
  iconSize?: string;
  textSize?: string;
  textColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  background: 'bg-black',
  iconSize: '5',
  textSize: 'sm',
  textColor: 'white'
});
</script>

<template>
  <div class="w-full p-2 flex justify-center items-center" :class="props.background">
    <img src="../../public/images/hamburger.png" alt="hamburger image"
      :class="`w-${props.iconSize} h-${props.iconSize} mr-4`">
    <span :class="`font-semibold tracking-widest text-${props.textColor} text-${props.textSize}`">YOLO</span>
  </div>
</template>
