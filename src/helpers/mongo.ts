export const toMongoRecord = <DocT, ValueT>(value: ValueT, field: keyof DocT) => {
  return { [`${field as string}`]: value };
};
