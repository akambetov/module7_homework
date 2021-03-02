console.log("Задача 5.");
// ElectricalDevice
class ElectricalDevice {
    constructor() {
        this.voltage = 220;
        this.location = "Дом";
    }
    
    turnOn () {
        this.isPlugged = true;
        console.log(`${this.name}: включен в розетку.`);
    }
    turnOff () {
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
    }
    start () {
        if (this.isPlugged) {
          this.isReady = true;
          console.log("Готов к работе!");
        } else console.error("Подключите прибор в розетку!");
    }
    finish () {
        this.isReady = false;
        this.timer = 0;
        this.isWorking = false;
        console.log("Прибор отключен.");
    }
    getPower () {
        this.power = this.voltage * this.current;
        console.log(`${this.name}: ${this.power} Вт`);
    }
    getVoltage () {
        console.log(`${this.name}: ${this.voltage} В`);
    }
    getCurrent () {
        console.log(`${this.name}: ${this.current} А`);
    }
}

// TV
class Tv extends ElectricalDevice{
 
    constructor ( {
        name,
        current,
        diagonal,
        maxSound = 10,
        isSmart = true,
        channels = ["CNN", "BBC", "Fox News"],
      } = options) {
        super ();
        this.name = name;
        this.current = current;
        this.diagonal = diagonal;
        this.isSmart = isSmart;
        this.currentSound = 0;
        this.maxSound = maxSound;
        this.channels = channels;
        this.currentChannel = 0;
    }
    checkingSystem ({ isPlugged, isReady } = options) {
        if (!isPlugged) console.error("Включите телевизор в розетку!");
        else if (!isReady) console.error("Нажмите на кнопку 'Включить'.");
        else this.isWorking = true;
    }
    enableWifi () {
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
    }
    disableWifi () {
        this.isWifiEnabled = false;
        console.log("WiFi отключен.");
    }
    internetOn (app = "YouTube") {
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
    }
    internetOff () {
        if (this.isWorking) {
          console.log(`Закрыть приложение ${this.app}`);
          this.isWorking = false;
          this.app = null;
        }
    }
    soundHi () {
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
    }
    soundLow () {
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
    }
    nextChannel () {
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
    }
    prevChannel () {
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
    }
    setAutoTurnOff (ms) {
        this.timer = ms;
      
        (() => {
          console.log(
            `Телевизор отключиться автоматически через ${this.timer / 1000} секунд.`
          );
          setTimeout(this.finish.bind(this), this.timer);
        })();
    }
}

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
// tv.turnOff();
console.log("_________________________________________");

//MicrowaveOven
class MicrowaveOven extends ElectricalDevice{
    constructor({ name, current, volume } = options) {
        super();
        this.name = name;
        this.current = current;
        this.volume = volume;
        this.mode = "default";
    }
    warmUp (mode = "default") {
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
    }
    getVolume () {
        console.log(`Оюъем камеры ${this.volume} л.`);
      };
    finish () {
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
    }
}

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