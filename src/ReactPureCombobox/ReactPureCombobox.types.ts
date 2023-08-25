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
  enableScroll?: boolean;
  enableSearch?: boolean;
  showTags?: boolean;
  onChange?: (values: string[]) => void;
};
