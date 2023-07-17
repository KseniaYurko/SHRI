const stepSymbol = Symbol('step');

function Sequence(from, to, step) {
  if (!(this instanceof Sequence)) {
    return new Sequence(from, to, step);
  }

  this['from'] = from;
  this['to'] = to;
  this[stepSymbol] = step;

  Object.defineProperty(this, 'from', {
    enumerable: false,
    writable: false,
    configurable: false
  });

  Object.defineProperty(this, 'to', {
    enumerable: false,
    writable: false,
    configurable: false
  });

  Object.defineProperty(this, stepSymbol, {
    enumerable: false,
    writable: true,
    configurable: true
  });

  Object.preventExtensions(this);
}

Sequence.prototype[Symbol.toStringTag] = 'SequenceOfNumbers';

Sequence.prototype[Symbol.toPrimitive] = function (hint) {
  if (hint === 'number') {
    return Math.ceil((this.to - this.from) / this[stepSymbol]) + 1;
  }
  if (hint === 'string') {
    return `Sequence of numbers from ${this.from} to ${this.to} with step ${this[stepSymbol]}`;
  }
  return `[object ${this[Symbol.toStringTag]}]`;
};

Sequence.prototype[Symbol.iterator] = function* () {
  let current = this.from;
  while (current <= this.to) {
    yield current;
    current += this[stepSymbol];
  }
};

// Sequence.prototype[Symbol.iterator] = function* () {
//   if (this[fromSymbol] < this[toSymbol]) {
//     while (this[fromSymbol] <= this[toSymbol]) {
//       yield this[fromSymbol];
//       this[fromSymbol] += Math.abs(this[stepSymbol]);
//     }
//   } else {
//     while (this[fromSymbol] >= this[toSymbol]) {
//       yield this[fromSymbol];
//       this[fromSymbol] -= Math.abs(this[stepSymbol]);
//     }
//   }
// };

Sequence.prototype.setStep = function (step) {
  this[stepSymbol] = step;
};

Object.defineProperty(Sequence.prototype, 'constructor', {
  value: Sequence,
  enumerable: false,
  writable: true,
  configurable: true
});

Object.defineProperty(Sequence.prototype, 'setStep', {
  value: Sequence.prototype.setStep,
  enumerable: false,
  writable: true,
  configurable: true
});

module.exports = Sequence;
