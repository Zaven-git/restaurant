import { defineStore } from 'pinia';
import Api from '../src/api/orders';

export const useOrderStore = defineStore('orders', {
  state: () => {
    return {
      mainItems: [],
      menuItems: [],
      ingredients: [],
    };
  },
  getters: {
    mainItemsList: (state) => state.mainItems,
    menuItemList: (state) => state.menuItems,
    ingredientList: (state) => state.ingredients,
  },
  actions: {
    getMainItems() {
      Api.getMainItems()
        .then((res: any) => {
          this.mainItems = Object.keys(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getMenuItems() {
      Api.getMenuItems()
        .then((res: any) => {
          this.menuItems = Object.keys(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getIngredientsByItemName(itemName: string) {
      Api.getIngredientsByItemName(itemName)
        .then((res: any) => {
          this.ingredients = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
