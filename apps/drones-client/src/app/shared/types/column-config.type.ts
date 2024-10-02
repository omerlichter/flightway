type EditableColumnConfig<T> = {
  readonly header: string;
  readonly field: keyof T;
  readonly editable: true;
  readonly units?: string;
};

type NonEditableColumnConfig<T> = {
  readonly header: string;
  readonly field: keyof T;
  readonly editable: false;
  readonly units?: string;
};

export type ColumnConfig<T> = EditableColumnConfig<T> | NonEditableColumnConfig<T>;
