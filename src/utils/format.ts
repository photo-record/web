export const numberToPhoneNumber = (number: number | string) => {
  if (number) {
    return number.toString().replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  }
};

export const numberToSocialNumber = (number: number | string) => {
  if (number) {
    let str = number.toString().replace('-', '');

    if (str.length > 6) {
      str = str.substring(0, 6) + '-' + str.substring(6);
    }

    return str;
  }
};
