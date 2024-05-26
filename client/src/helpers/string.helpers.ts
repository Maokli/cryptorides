export const isNullOrEmpty = (obj: any) => {
  return obj === null || obj === undefined || obj?.length === 0;
}