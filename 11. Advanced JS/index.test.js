const Sequence = require('./index');

// - возможность использования конструктора без ключевого слова new.
test("результатом преобразования String(Sequence(0, 10, 1)) должна быть строка: ’Sequence of numbers from 0 to 10 with step 1'", () => {
  expect(String(Sequence(0, 10, 1))).toBe(
    'Sequence of numbers from 0 to 10 with step 1'
  );
});

test('результатом преобразования Number(Sequence(0, 10, 1)) должно быть количество элементов последовательности: 11', () => {
  expect(Number(Sequence(0, 10, 1))).toBe(11);
});

test('результатом преобразования Sequence(0, 10, 1).toString() должна быть строка: ’[object SequenceOfNumbers]’', () => {
  expect(Sequence(0, 10, 1).toString()).toBe('[object SequenceOfNumbers]');
});

test('должна быть возможность обойти все элементы числовой последовательности с помощью цикла for..of', () => {
  const sequence = Sequence(0, 10, 1);
  let count = 0;
  for (const iterator of sequence) {
    expect(iterator).toBe(count);
    count++;
  }
});

test('должен быть метод setStep, который принимает аргумент step (положительное число, шаг последовательности) и преобразует последовательность в новую, с обновленным шагом и начинающуюся с текущего значения итератора', () => {
  let step = 1;
  const newStep = 2;
  const sequence = Sequence(0, 10, step);

  let count = 0;

  for (const iterator of sequence) {
    expect(iterator).toBe(count);
    count += step;

    if (count === 2) {
      count += step;
      step = newStep;
      sequence.setStep(newStep);
    }
  }
});

test('объект не должен иметь собственных перечисляемых свойств и методов', () => {
  const sequence = new Sequence(0, 10, 1);
  expect(Object.keys(sequence)).toEqual([]);
});

test('прототип объекта должен содержать только методы constructor и setStep', () => {
  const sequence = new Sequence(0, 10, 1);
  expect(Object.getOwnPropertyNames(Object.getPrototypeOf(sequence))).toEqual([
    'constructor',
    'setStep',
  ]);
});

// - нигде не должна храниться полная числовая последовательность (есть ограничение по использованию памяти)

test('должна быть возможность обойти все элементы числовой последовательности с помощью цикла for..of', () => {
  let step = 1;
  let count = 70;
  const sequence = Sequence(count, 80, step);
  step = 3;
  sequence.setStep(step);
  const array2 = [];
  for (const iterator of sequence) {
    array2.push(iterator);
    expect(iterator).toBe(count);
    count += step;
  }
});

test('Работает метод setStep', () => {
  sequence = Sequence(0, 10, 2);
  iterator = sequence[Symbol.iterator]();

  iterator.next();
  iterator.next();
  sequence.setStep(4);

  expect(Number(sequence)).toBe(3);
  // expect(String(sequence)).toBe('Sequence of numbers from 2 to 10 with step 4');
  // expect(String([...sequence])).toBe(String([2, 6, 10]));
});

test('Работает метод setStep', () => {
  sequence = Sequence(0, 10, 2);
  iterator = sequence[Symbol.iterator]();

  iterator.next();
  iterator.next();
  sequence.setStep(4);

  expect(String(sequence)).toBe('Sequence of numbers from 2 to 10 with step 4');
});

test('Работает метод setStep', () => {
  sequence = Sequence(0, 10, 2);
  iterator = sequence[Symbol.iterator]();

  iterator.next();
  iterator.next();
  sequence.setStep(4);

  // expect(Number(sequence)).toBe(3);
  // expect(String(sequence)).toBe('Sequence of numbers from 2 to 10 with step 4');
  expect(String([...sequence])).toBe(String([2, 6, 10]));
});

test('Скрыты лишние свойства и методы', () => {
  sequence = Sequence(0, 10, 1);

  expect(String(Object.getOwnPropertyNames(sequence))).toBe(String([]));
  expect(String(Object.getOwnPropertyNames(Sequence.prototype).sort())).toBe(
    String(['constructor', 'setStep'])
  );
});

test('Можно работать независимо с разными экземплярами последовательности', () => {
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

  expect(String([12, 12.5, 13, 13.5, 14, 14.5, 15])).toBe(
    String([...sequence2])
  );
});

test('Можно работать независимо с разными экземплярами последовательности', () => {
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

  expect(String([1, 3, 5])).toBe(String([...sequence]));
});

test('Работает деструктуризация последовательности', () => {
  expect(String([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toBe(
    String([...Sequence(0, 10, 1)])
  );
});

test('Работает в цикле for-of ', () => {
  sequence = Sequence(5, -5, 1);
  result = [];
  for (const item of sequence) {
    result.push(item);
  }
  expect(String([5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5])).toBe(String(result));
});

test('Преобразования к примитивам ', () => {
  sequence = Sequence(0, 10, 1);
  expect(Object.prototype.toString.call(sequence)).toBe(
    '[object SequenceOfNumbers]'
  );
  expect(String(sequence)).toBe('Sequence of numbers from 0 to 10 with step 1');
  expect(Number(sequence)).toBe(11);
});
