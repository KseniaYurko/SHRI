// "Мне глобальные символы помогли"
// https://learn.javascript.ru/symbol#globalnye-simvoly

function SequencePrototype() {
  // в качестве конструтора мы указываем саму функцию конструктор
  this.constructor = SequencePrototype;

  //TODO: sequence.toString() => [object SequenceOfNumbers]
  // https://learn.javascript.ru/instanceof#symbol-tostringtag
  // https://t.me/c/1640099527/11603/12204
  this[Symbol.toStringTag] = 'SequenceOfNumbers';
  
  //TODO: Number(Sequence(0, 10, 1)) => 11
  //TODO: String(Sequence(0, 10, 1)) => 'Sequence of numbers from 0 to 10 with step 1'
  // https://t.me/c/1640099527/11603/11922
  this[Symbol.toPrimitive] = function (hint) {
    if (hint === 'number') {
      return Math.ceil((this.to - this.from) / this.step) + 1;
    }
    if (hint === 'string') {
      return `Sequence of numbers from ${this.from} to ${this.to} with step ${this.step}`;
    }
    return `[object ${this[Symbol.toStringTag]}]`;
  };
  
  //TODO: нужно сделать генератор
  // https://learn.javascript.ru/generator
  // https://t.me/c/1640099527/11603/12156
  this[Symbol.iterator] = function* () {
    for (let i = this.from; i <= this.to; i += this.step) {
      yield i;
    }
  };

  //TODO: создать функцию указания шага
  this.setStep = function (step) {
    if (typeof step !== 'number' || step <= 0) {
      throw new Error('Invalid step argument');
    }
    this.step = step;
  };
}

function Sequence(from, to, step) {
  // сделать защиту, от вызова без new (скрин 1.png)
  if (typeof new.target === 'undefined') {
    return new Sequence(from, to, step);
  }

  this.from = from;
  this.to = to;
  this.step = step;
  Object.setPrototypeOf(this, SequencePrototype.prototype);

}

Sequence.prototype = SequencePrototype.prototype;
module.exports = Sequence;

