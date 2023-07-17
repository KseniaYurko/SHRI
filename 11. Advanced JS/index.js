const symbFrom = Symbol.for('from');
const symbTo = Symbol.for('to');
const symbStep = Symbol.for('step');

function Sequence(from, to, step) {
  if (typeof new.target === 'undefined') {
    return new Sequence(from, to, step);
  }

  this[symbFrom] = from;
  this[symbTo] = to;
  this[symbStep] = step;
}

Sequence.prototype.constructor = Sequence;

Sequence.prototype[Symbol.toStringTag] = 'SequenceOfNumbers';

Sequence.prototype[Symbol.toPrimitive] = function (hint) {
  if (hint === 'string') {
    return `Sequence of numbers from ${this[symbFrom]} to ${this[symbTo]} with step ${this[symbStep]}`;
  } else if (hint === 'number') {
    return (
      Math.ceil((this[symbTo] - this[symbFrom]) / this[symbStep]) + 1
    );
  }
  return null;
};

Sequence.prototype[Symbol.iterator] = function* () {
  if (this[symbFrom] < this[symbTo]) {
    while (this[symbFrom] <= this[symbTo]) {
      yield this[symbFrom];
      this[symbFrom] += Math.abs(this[symbStep]);
    }
  } else {
    while (this[symbFrom] >= this[symbTo]) {
      yield this[symbFrom];
      this[symbFrom] -= Math.abs(this[symbStep]);
    }
  }
};

Sequence.prototype.setStep = function (step) {
  this[symbStep] = step;
};

module.exports = Sequence;