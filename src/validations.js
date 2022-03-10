export const notEmptyValidator = (address) => {
  if (address && address.length > 0) {
    return true;
  } else return false;
};

export const zipCodeValidator = (zipCode) => {
  return /^\d{5}(-\d{4})?$/.test(zipCode);
};
