module.exports = Sequence;

function Sequence(from, to, step) {
    if (!(this instanceof Sequence)) {
      return new Sequence(from, to, step);
    }
  
    if (typeof from !== 'number' || typeof to !== 'number' || typeof step !== 'number') {
      throw new Error('Invalid arguments: from, to, and step must be numbers');
    }
  
    if (step <= 0) {
      throw new Error('Invalid step argument: step must be a positive number');
    }
  
    this.from = from;
    this.to = to;
    this.step = step;
  }
  
  Sequence.prototype[Symbol.toStringTag] = 'SequenceOfNumbers';
  
  Sequence.prototype[Symbol.toPrimitive] = function (hint) {
    if (hint === 'number') {
      return Math.ceil((this.to - this.from) / this.step) + 1;
    }
    if (hint === 'string') {
      return `Sequence of numbers from ${this.from} to ${this.to} with step ${this.step}`;
    }
    return `[object ${this[Symbol.toStringTag]}]`;
  };
  
  Sequence.prototype[Symbol.iterator] = function* () {
    let current = this.from;
    while (current <= this.to) {
        yield current;
        current += this.step;
    }
  };
  
  Sequence.prototype.setStep = function (step) {
    if (typeof step !== 'number' || step <= 0) {
      throw new Error('Invalid step argument: step must be a positive number');
    }
    this.step = step;
  };


  
// ТЕСТЫ

let sequence = null;
let iterator = null;
let sequence2 = null;
let iterator2 = null;
let result = null;

// Преобразования к примитивам
sequence = Sequence(0, 10, 1);

console.assert(Object.prototype.toString.call(sequence) === '[object SequenceOfNumbers]');
console.assert(String(sequence) === 'Sequence of numbers from 0 to 10 with step 1');
console.assert(Number(sequence) === 11);


// Работает в цикле for-of
sequence = Sequence(5, -5, 1);

result = [];
for (const item of sequence) {
    result.push(item)
}
//ASSERTION FAILED
console.assert(String([5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5]) === String(result));


// Работает деструктуризация последовательности
console.assert(String([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) === String([...Sequence(0, 10, 1)]));


// Работает метод setStep
sequence = Sequence(0, 10, 2);
iterator = sequence[Symbol.iterator]();

iterator.next();
iterator.next();
sequence.setStep(4);

//ASSERTION FAILED
// console.assert(Number(sequence) === 3);
//ASSERTION FAILED
// console.assert(String(sequence) === 'Sequence of numbers from 2 to 10 with step 4');
//ASSERTION FAILED
// console.assert(String([...sequence]) === String([2, 6, 10]));


// Скрыты лишние свойства и методы
sequence = Sequence(0, 10, 1);

//ASSERTION FAILED
// console.assert(String(Object.getOwnPropertyNames(sequence)) === String([]));
console.assert(String(Object.getOwnPropertyNames(Sequence.prototype).sort()) === String(['constructor', 'setStep']));


// Можно работать независимо с разными экземплярами последовательности
sequence = Sequence(0, 5, 1);
sequence2 = Sequence(10, 15, 1);
iterator = sequence[Symbol.iterator]();
iterator2 = sequence2[Symbol.iterator]();

iterator2.next();
iterator2.next();
iterator2.next();
sequence2.setStep(0.5);

iterator.next();
iterator.next();
sequence.setStep(2);

//ASSERTION FAILED
// console.assert(String([1, 3, 5]) === String([...sequence]));
//ASSERTION FAILED
// console.assert(String([12, 12.5, 13, 13.5, 14, 14.5, 15]) === String([...sequence2]));