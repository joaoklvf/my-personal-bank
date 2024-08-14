export type SelectComponentProps<T> = {
  options: T[] | null;
  dataLabel: keyof T;
  dataValue: keyof T;
  dataColor?: keyof T;
  dataBackGroundColor?: keyof T;
  id: string;
  name: string;
};
