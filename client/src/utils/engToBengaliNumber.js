// Convert english number to bengali number
export const engToBengaliNumber = (number) => {
  const numbers = {
    0: '০',
    1: '১',
    2: '২',
    3: '৩',
    4: '৪',
    5: '৫',
    6: '৬',
    7: '৭',
    8: '৮',
    9: '৯',
  };
  return number.toString().replace(/\d/g, (match) => numbers[match]);
};

export const engToArabicNumber = (number) => {
  const numbers = {
    0: '٠',
    1: '١',
    2: '٢',
    3: '٣',
    4: '٤',
    5: '٥',
    6: '٦',
    7: '٧',
    8: '٨',
    9: '٩',
  };
  return number.toString().replace(/\d/g, (match) => numbers[match]);
};
