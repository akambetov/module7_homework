/**Задание 2.
Написать функцию, которая принимает в качестве аргументов строку и объект, 
а затем проверяет есть ли у переданного объекта свойство с данным именем. 
Функция должна возвращать true или false. */

function checkProp(str, obj) {
  return str in obj;
}

obj2 = {
  age: 18,
  name: "Dan",
};

console.log("Исходный объект: ");
console.log(obj2);
let res1 = checkProp("age", obj2);
console.log(res1);
let res2 = checkProp("position", obj2);
console.log(res2);
