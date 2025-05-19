export class NumberLimiter {
  #minimum;
  #maximum;
  #value;
  #numberType;
  #precision;
  #limitMinimum;
  #limitMaximum;

  constructor(
    minimum,
    maximum,
    initialValue,
    numberType = null,
    precision = 2
  ) {
    this.#minimum = minimum;
    this.#maximum = maximum;
    this.#value = initialValue;
    this.#numberType = numberType;
    this.#precision = precision;

    this.#initLimits();
    this.value = initialValue;
  }

  #shouldAdjust(number) {
    if (this.#numberType === "odd" && number % 2 === 0) return true;
    if (this.#numberType === "even" && number % 2 !== 0) return true;
    return false;
  }

  #adjustLimit(limit, adjustment) {
    return this.#shouldAdjust(limit) ? limit + adjustment : limit;
  }

  #initLimits() {
    this.#limitMinimum = this.#adjustLimit(this.#minimum, 1);
    this.#limitMaximum = this.#adjustLimit(this.#maximum, -1);
  }

  incrementBy(amount) {
    let newVal = this.#value + amount;
    if (this.#shouldAdjust(newVal)) {
      newVal += 1;
    }
    this.value = newVal;
  }

  decrementBy(amount) {
    let newVal = this.#value - amount;
    if (this.#shouldAdjust(newVal)) {
      newVal += 1;
    }
    this.value = newVal;
  }

  get value() {
    return this.#value;
  }

  set value(newValue) {
    if (this.#shouldAdjust(newValue)) {
      newValue += 1;
    }
    newValue = parseFloat(newValue.toFixed(this.#precision));
    this.#value = Math.min(
      Math.max(newValue, this.#limitMinimum),
      this.#limitMaximum
    );
  }

  setValue(newValue) {
    this.value = newValue;
  }

  getValue() {
    return this.value;
  }
}
