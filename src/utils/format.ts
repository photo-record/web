export const numberToPhoneNumber = (number: number | string) => {
  if (number) {
    return number
      .toString()
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
      .replace(/\-{1,2}$/g, '');
  }
};
export const numberToDate = (number: number | string) => {
  if (number) {
    return number
      .toString()
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, '$1-$2-$3')
      .replace(/\-{1,2}$/g, '');
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
