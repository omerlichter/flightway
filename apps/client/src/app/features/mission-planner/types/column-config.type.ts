export type ColumnConfig<T> = {
  readonly header: string;
  readonly field: keyof T;
  readonly editable: boolean;
  readonly units?: string;
};
