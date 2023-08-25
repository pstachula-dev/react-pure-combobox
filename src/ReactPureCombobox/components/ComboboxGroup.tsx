import { Fragment } from 'react';

import { ComboboxItem, ComboboxTreeItem } from '../ReactPureCombobox.types';

const ITEM_MARGIN = 10;

export function ComboboxGroup({
  level = 0,
  data,
  values,
  setValues,
  setOpen,
  onChange,
}: {
  level?: number;
  data: ComboboxTreeItem[];
  values: ComboboxItem['value'][];
  setValues: (values: ComboboxItem['value'][]) => void;
  onChange?: (values: ComboboxItem['value'][]) => void;
  setOpen: (value: boolean) => void;
}) {
  const onSelect = (currentValue: string) => {
    const newValues = values.includes(currentValue)
      ? values.filter((v) => v !== currentValue)
      : [...values, currentValue];
    setValues(newValues);
    onChange?.(newValues);
  };

  return (
    <div>
      {data.map(({ value, children, label }) => (
        <Fragment key={value}>
          <div className="flex" style={{ marginLeft: ITEM_MARGIN * level }}>
            {/* 
              We are using a native input
              because we want to dispatch native change event 
            */}
            <input
              id={value}
              type="checkbox"
              className="mr-2 inline-block"
              defaultChecked={values.includes(value)}
              onChange={() => onSelect(value)}
            />
            <label className="block w-full py-1.5 font-normal" htmlFor={value}>
              {label}
            </label>
          </div>
          {children.length > 0 && (
            <ComboboxGroup
              level={level + 1}
              data={children}
              values={values}
              setValues={setValues}
              setOpen={setOpen}
              onChange={onChange}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
}
