<script setup>
import { onMounted, ref, watch } from 'vue'
import VHeader from './VHeader.vue'
import { useOrderStore } from '../../store/orders'
import { Colors, MainItems } from '../enums/index'
const store = useOrderStore()

const inputValue = ref('')
const selectedItems = ref([]);
const list = ref([]);
const lastMainItem = ref('')
const complete = ref(false);
const completed = ref(false)

function selectItem(name) {
  selectedItems.value.push(name === MainItems[2] ? [name]: name)
  if (name in MainItems) {
    lastMainItem.value = name;
  } else {
    let obj = {};
    obj[lastMainItem.value] = name;
    selectedItems.value.push(obj)
    selectedItems.value = selectedItems.value.filter((el) => typeof el !== 'string' && el[lastMainItem.value] !== lastMainItem.value)
  }
  if (Object.keys(selectedItems.value[selectedItems.value.length - 1])[0] in MainItems) {
    returnToFirstSteps();
  }
  if (name === MainItems[0]) {
    store.getMenuItems();
  }
  if (name === MainItems[1]) {
    const menuItem = Object.values(selectedItems.value[selectedItems.value.length - 2])
    store.getIngredientsByItemName(menuItem);
  }
  if (name === MainItems[2]) {
    returnToFirstSteps();
  }
}

const returnToFirstSteps = () => list.value = store.mainItems;

const clearAll = () => {
  selectedItems.value = [];
  list.value = store.mainItems;
}

const modifiedItem = (item) => {
  if (Array.isArray(item)) {
    return item[0]
  } else if (typeof item === 'object') {
    return Object.entries(item)[0][0].slice(0, 1) + '/' + Object.entries(item)[0][1]
  } else {
    return item
  }
}

const setColor = (item) => Colors[Object.keys(item)[0]] || Colors[item]

const accumulateReciept = () => {
    complete.value = false;
    completed.value = true;    
}

watch(
  () => selectedItems.value,
  (val) => {
    if(Object.entries(val[val.length-1])[0][0] === MainItems[1]){
      complete.value = true
    }
  },
)

onMounted(() => store.getMainItems())

store.$subscribe((store) => {
  list.value = store.events.newValue;
})

</script>

<template>
  <div class="pt-36 relative z-10">
    <v-header background="white" iconSize='10' textSize="2xl" textColor="black" />
    <div class="flex items-center flex-col w-fill">
      <div class="md:w-1/2 w-9/12 relative border border-black rounded p-1">
        <div class="flex flex-wrap">
          <span v-for="item in selectedItems" :key="item" class="px-2 break-keep text-xs py-1 rounded mx-1 my-1 flex"
            :class="`bg-${setColor(item)}-300 text-${setColor(item)}-800`">
            {{ modifiedItem(item) }}
          </span>
        </div>
        <img v-if="complete" src="../../public/images/icons/arrow-right.svg" alt="complete icon" class="w-3 mt-1 absolute right-2 top-1 cursor-pointer" @click="accumulateReciept"/>
        <img v-else src="../../public/images/icons/close-icon.svg" alt="close" class="w-4 mt-1 absolute right-2 top-1 cursor-pointer" @click="clearAll" />
        <input type="text" v-model="inputValue" class="w-full outline-none pl-2 text-xs" />
      </div>
      <div class="shadow-lg rounded md:w-1/2 w-9/12 mt-1 py-4 px-4 flex flex-col justify-center items-left">
        <template v-if="!completed">  
        <p class="text-left my-1.5 text-xs" v-for="name in list" :key="name">
          <span :class="`px-2 cursor-pointer py-1 rounded bg-${Colors[name]}-300 text-${Colors[name]}-800`"
            @click="selectItem(name)">
            {{ name }}
          </span>
        </p>
      </template>
        <p v-else>
          <span class="text-left">Order : </span>
          <span v-for="item in selectedItems" :key="item" class="block text-left">{{ Object.entries(item)[0][1] }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
