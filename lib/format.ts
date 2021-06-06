import { startCase } from 'lodash';

export const formatField = (field: string) => {
  return field.length == 1 ? field : startCase(field);
};
