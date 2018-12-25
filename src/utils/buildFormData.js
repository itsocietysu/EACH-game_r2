/* eslint-disable guard-for-in, no-restricted-syntax */
export default function buildFormData(data) {
  const formArr = [];

  for (const name in data) {
    const val = data[name];
    if (val !== undefined && val !== '') {
      formArr.push(
        [name, '=', val].join(''),
      );
    }
  }
  return formArr.join('&');
};