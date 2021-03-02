/**Задание 1.
Написать, функцию, которая принимает в качестве аргумента объект и 
выводит в консоль все ключи и значения только собственных свойств.
Данная функция не должна возвращать значение. */

const proto = {
  parentProp_1: "parentProp_1",
  parentProp_2: "parentProp_2",
  parentProp_3: "parentProp_3",
};

const child = Object.create(proto);
child.ownProp_1 = "ownProp_1";
child.ownProp_2 = "ownProp_2";
child.ownProp_3 = "ownProp_3";

function printObjOwnProp(obj) {
  // for (let key in obj) {
  //   if (obj.hasOwnProperty(key)) {
  //     console.log(`${key}: ${obj[key]} `);
  //   }
  // }
  Object.keys(obj).forEach((key) => {
    console.log(`${key}: ${obj[key]} `);
  });
}
printObjOwnProp(child);
