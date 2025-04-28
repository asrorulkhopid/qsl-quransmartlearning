export default class Utils {
  static convertLatinNumbertoArabic = (latinNumber) => {
    const arabicNumbers = `۰۱۲۳٤۵٦۷۸۹`;
    let result = "";
    for (const char of latinNumber.toString()) {
      const digit = parseInt(char);
      result += arabicNumbers[digit];
    }
    return result;
  };

  static isUnderScreenWidth = (breakpoint) => window.innerWidth < breakpoint;
}
