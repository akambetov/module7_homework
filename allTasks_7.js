/**Задание 1.
Написать, функцию, которая принимает в качестве аргумента объект и 
выводит в консоль все ключи и значения только собственных свойств.
Данная функция не должна возвращать значение. */

console.log("Задача 1");
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

console.log("______________________________________________________");

// ===================================================================================================================================================================

/**Задание 2.
Написать функцию, которая принимает в качестве аргументов строку и объект, 
а затем проверяет есть ли у переданного объекта свойство с данным именем. 
Функция должна возвращать true или false. */

console.log("Задача 2");
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

console.log("______________________________________________________");

// ===================================================================================================================================================================

/**Задание 3.
Написать функцию, которая создает пустой объект, но без прототипа. */

console.log("Задача 3");
function objWithoutProto() {
  return Object.create(null);
}

const obj3 = objWithoutProto();
console.log(obj3);
console.log("______________________________________________________");

// ===================================================================================================================================================================
/**Задание 4.

Реализовать следующее консольное приложение подобно примеру, который разбирался в видео. Реализуйте его на прототипах.

Определить иерархию электроприборов. Включить некоторые в розетку. Посчитать потребляемую мощность. 

Таких приборов должно быть, как минимум, два (например, настольная лампа и компьютер). Выбрав прибор, подумайте, какими свойствами он обладает.

План:

1. Определить родительскую функцию с методами, которые включают/выключают прибор из розетки;
2. Создать делегирующую связь [[Prototype]] для двух конкретных приборов;
3. У каждого из приборов должны быть собственные свойства и, желательно, методы, отличные от родительских методов;
4. Создать экземпляры каждого прибора;
5. Вывести в консоль и посмотреть результаты работы, гордиться собой :)
 */

console.log("Задача 4.");
// ElectricalDevice
function ElectricalDevice() {
  this.voltage = 220;
  this.location = "Дом";
}
ElectricalDevice.prototype.turnOn = function () {
  this.isPlugged = true;
  console.log(`${this.name}: включен в розетку.`);
};
ElectricalDevice.prototype.turnOff = function () {
  this.isPlugged = false;
  this.isReady = false;
  this.timer = 0;
  if (this.isWorking) {
    clearTimeout(this.emergencyShutdown);
    this.isWorking = false;
    console.error(
      "Авайриное отключение питания. Проверьте, подключен ли прибор в розетку."
    );
  } else console.log(`${this.name}: отключен из розетки.`);
};
ElectricalDevice.prototype.start = function () {
  if (this.isPlugged) {
    this.isReady = true;
    console.log("Готов к работе!");
  } else console.error("Подключите прибор в розетку!");
};
ElectricalDevice.prototype.finish = function () {
  this.isReady = false;
  this.timer = 0;
  this.isWorking = false;
  console.log("Прибор отключен.");
};
ElectricalDevice.prototype.getPower = function () {
  this.power = this.voltage * this.current;
  console.log(`${this.name}: ${this.power} Вт`);
};
ElectricalDevice.prototype.getVoltage = function () {
  console.log(`${this.name}: ${this.voltage} В`);
};
ElectricalDevice.prototype.getCurrent = function () {
  console.log(`${this.name}: ${this.current} А`);
};

function Tv({
  name,
  current,
  diagonal,
  maxSound = 10,
  isSmart = true,
  channels = ["CNN", "BBC", "Fox News"],
} = options) {
  this.name = name;
  this.current = current;
  this.diagonal = diagonal;
  this.isSmart = isSmart;
  this.currentSound = 0;
  this.maxSound = maxSound;
  this.channels = channels;
  this.currentChannel = 0;
}

Tv.prototype = new ElectricalDevice();
Tv.prototype.checkingSystem = function ({ isPlugged, isReady } = options) {
  if (!isPlugged) console.error("Включите телевизор в розетку!");
  else if (!isReady) console.error("Нажмите на кнопку 'Включить'.");
  else this.isWorking = true;
};
Tv.prototype.enableWifi = function () {
  if (!this.isPlugged || !this.isReady) {
    this.checkingSystem({
      isPlugged: this.isPlugged,
      isReady: this.isReady,
    });
  } else if (!this.isSmart) console.error("Нет модуля WiFi'.");
  else {
    this.isWifiEnabled = true;
    console.log("WiFi подключен.");
  }
};
Tv.prototype.disableWifi = function () {
  this.isWifiEnabled = false;
  console.log("WiFi отключен.");
};
Tv.prototype.internetOn = function (app = "YouTube") {
  if (!this.isPlugged || !this.isReady) {
    this.checkingSystem({
      isPlugged: this.isPlugged,
      isReady: this.isReady,
    });
  } else if (!this.isWifiEnabled) console.error("Включите WiFi'.");
  else {
    this.isWorking = true;
    this.app = app;
    console.log(`Вы пользуетесь приложением ${app}`);
  }
};
Tv.prototype.internetOff = function () {
  if (this.isWorking) {
    console.log(`Закрыть приложение ${this.app}`);
    this.isWorking = false;
    this.app = null;
  }
};
Tv.prototype.soundHi = function () {
  if (!this.isPlugged || !this.isReady) {
    this.checkingSystem({
      isPlugged: this.isPlugged,
      isReady: this.isReady,
    });
  } else if (this.isPlugged && this.isReady) {
    this.isWorking = true;
  }
  if (this.currentSound < this.maxSound) {
    this.currentSound++;
    console.log(`Уровень звука ${this.currentSound}`);
  } else console.log(`Звук на максимальном уровне ${this.maxSound}`);
};
Tv.prototype.soundLow = function () {
  if (!this.isPlugged || !this.isReady) {
    this.checkingSystem({
      isPlugged: this.isPlugged,
      isReady: this.isReady,
    });
  } else if (this.isPlugged && this.isReady) {
    this.isWorking = true;
  }
  if (this.currentSound > 0) {
    this.currentSound--;
    console.log(`Уровень звука ${this.currentSound}`);
  } else console.log(`Звук на минимальном уровне 0`);
};
Tv.prototype.nextChannel = function () {
  if (!this.isPlugged || !this.isReady) {
    this.checkingSystem({
      isPlugged: this.isPlugged,
      isReady: this.isReady,
    });
  } else if (this.isPlugged && this.isReady) {
    this.isWorking = true;
  }
  if (this.currentChannel < this.channels.length - 1) {
    this.currentChannel++;
    console.log(`Вы смотрите канал ${this.channels[this.currentChannel]}`);
  } else {
    this.currentChannel = 0;
    console.log(`Вы смотрите канал ${this.channels[this.currentChannel]}`);
  }
};
Tv.prototype.prevChannel = function () {
  if (!this.isPlugged || !this.isReady) {
    this.checkingSystem({
      isPlugged: this.isPlugged,
      isReady: this.isReady,
    });
  } else if (this.isPlugged && this.isReady) {
    this.isWorking = true;
  }
  if (this.currentChannel > 0) {
    this.currentChannel--;
    console.log(`Вы смотрите канал ${this.channels[this.currentChannel]}`);
  } else {
    this.currentChannel = this.channels.length - 1;
    console.log(`Вы смотрите канал ${this.channels[this.currentChannel]}`);
  }
};
Tv.prototype.setAutoTurnOff = function (ms) {
  this.timer = ms;

  (() => {
    console.log(
      `Телевизор отключиться автоматически через ${this.timer / 1000} секунд.`
    );
    setTimeout(this.finish.bind(this), this.timer);
  })();
};
Tv.prototype.constructor = Tv;
const tv = new Tv({
  name: "Samsung",
  current: 5,
  diagonal: 40,
  maxSound: 5,
});

tv.getVoltage();
tv.getCurrent();
tv.getPower();

tv.turnOn();
tv.start();
tv.nextChannel();
tv.prevChannel();
tv.soundHi();
tv.soundLow();
// tv.setAutoTurnOff(2000);
console.log("_________________________________________");
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// MicrowaveOven
function MicrowaveOven({ name, current, volume } = options) {
  this.name = name;
  this.current = current;
  this.volume = volume;
  this.mode = "default";
}
MicrowaveOven.prototype = new ElectricalDevice();
MicrowaveOven.prototype.warmUp = function (mode = "default") {
  this.mode = mode;
  switch (this.mode) {
    case "breakfast":
      this.timer = 2000;
      break;
    case "lunch":
      this.timer = 2500;
      break;
    case "dinner":
      this.timer = 3000;
      break;
    case "default":
      this.timer = 15000;
  }

  if (this.isPlugged && this.isReady) {
    this.isWorking = true;
    console.log(`Ваша еда разогреется через ${this.timer / 1000} секунд`);
    this.emergencyShutdown = setTimeout(() => {
      console.log("Ваша еда разогрета!");
      this.isWorking = false;
      this.finish();
    }, this.timer);
  } else if (!this.isPlugged)
    console.error("Включите микроволновку в розетку!");
  else if (!this.isReady) console.error("Нажмите на кнопку 'Включить'.");
};
MicrowaveOven.prototype.getVolume = function () {
  console.log(`Оюъем камеры ${this.volume} л.`);
};
MicrowaveOven.prototype.finish = function () {
  this.isReady = false;
  this.timer = 0;
  if (this.isWorking) {
    clearTimeout(this.emergencyShutdown);
    this.isWorking = false;
    console.log("Отмена разогрева еды.");
  } else {
    this.isWorking = false;
    console.log("Прибор отключен.");
  }
};
MicrowaveOven.prototype.constructor = MicrowaveOven;

const microwaveOven = new MicrowaveOven({
  name: "Микроволновка",
  current: 5,
  volume: 20,
});
microwaveOven.getVoltage();
microwaveOven.getCurrent();
microwaveOven.getPower();
microwaveOven.getVolume();

microwaveOven.turnOn();
microwaveOven.start();
microwaveOven.warmUp("dinner");
// microwaveOven.turnOff();
