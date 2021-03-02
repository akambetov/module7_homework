/**Задание 3.
Написать функцию, которая создает пустой объект, но без прототипа. */

function objWithoutProto() {
  return Object.create(null);
}

const obj3 = objWithoutProto();
console.log(obj3);
