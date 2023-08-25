import { Fragment } from 'react';

import { ComboboxItem, ComboboxTreeItem } from '../ReactPureCombobox.types';
import { cn } from '../../utils/cn';

const ITEM_MARGIN = 10;

export function ComboboxGroup(props: {
  level?: number;
  showCheckboxes?: boolean;
  omitSelectedItems?: boolean;
  data: ComboboxTreeItem[];
  list: ComboboxItem[];
  values: ComboboxItem['value'][];
  setFiltered: (values: ComboboxItem[]) => void;
  setValues: (values: ComboboxItem['value'][]) => void;
  onChange?: (values: ComboboxItem[]) => void;
}) {
  const {
    level = 0,
    data,
    values,
    list,
    showCheckboxes,
    omitSelectedItems,
    setFiltered,
    setValues,
    onChange,
  } = props;

  const onSelect = (currentValue: string) => {
    const newValues = values.includes(currentValue)
      ? values.filter((v) => v !== currentValue)
      : [...values, currentValue];
    setValues(newValues);
    onChange?.(list.filter((el) => newValues.includes(el.value)));

    if (omitSelectedItems) {
      setFiltered(list.filter((el) => !newValues.includes(el.value)));
    }
  };

  return (
    <div>
      {data.map(({ value, children, label }) => (
        <Fragment key={value}>
          <div
            className="flex justify-start border-b  border-zinc-700 px-1 hover:cursor-pointer hover:bg-zinc-800"
            style={{ marginLeft: ITEM_MARGIN * level }}
          >
            <input
              id={value}
              type="checkbox"
              className={cn(!showCheckboxes && 'hidden', 'mr-2 inline-block')}
              defaultChecked={values.includes(value)}
              onChange={() => onSelect(value)}
            />
            <label
              className="w-full py-1.5 text-left font-normal"
              htmlFor={value}
            >
              {label}
            </label>
          </div>
          {children.length > 0 && (
            <ComboboxGroup {...props} level={level + 1} data={children} />
          )}
        </Fragment>
      ))}
    </div>
  );
}
