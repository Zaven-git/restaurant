import Schema from '../../schema.json';
const schema = JSON.parse(JSON.stringify(Schema));

export default {
  getMainItems(){
    return new Promise((resolve, reject) => {
      if (schema) {
        resolve(schema);
      } else {
        reject(new Error('something went wrong'));
      }
    });
  },
  getMenuItems() {
    return new Promise((resolve, reject) => {
      if (schema['Menu-Item']) {
        resolve(schema['Menu-Item']);
      } else {
        reject(new Error('something went wrong'));
      }
    });
  },
  getIngredientsByItemName(itemName: string) {
    return new Promise((resolve, reject) => {
      if (schema.Ingredient) {
        resolve(schema.Ingredient[itemName]);
      } else {
        reject(new Error('something went wrong'));
      }
    });
  },
};
