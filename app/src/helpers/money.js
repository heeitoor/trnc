export default class MoneyHelper {
  static format(value) {
    return `R$ ${parseFloat(value)
      .toFixed(2)
      .replace(".", ",")}`;
  }
}
