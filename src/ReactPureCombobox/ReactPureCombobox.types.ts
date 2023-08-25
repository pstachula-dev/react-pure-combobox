export type ComboboxItem = {
  value: string;
  label: string;
  parentId?: string | null;
};

export type ComboboxTreeItem = ComboboxItem & {
  children: ComboboxTreeItem[];
};

export type ComboboxProps = {
  selectLabel?: string;
  list: ComboboxItem[];
  showScroll?: boolean;
  showSearch?: boolean;
  showCheckboxes?: boolean;
  showTags?: boolean;
  onChange?: (values: ComboboxItem[]) => void;
};
