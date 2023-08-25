'use client';

import { FormEvent, useMemo, useRef, useState } from 'react';
import Close from '../assets/close.svg';

import { cn } from '../utils/cn';

import {
  ComboboxProps,
  ComboboxItem,
  ComboboxTreeItem,
} from './ReactPureCombobox.types';
import { ComboboxGroup } from './components/ComboboxGroup';
import { Popover } from './components/Popover';

const createTreeFromFlatList = (items: ComboboxTreeItem[]) => {
  const root: ComboboxTreeItem[] = [];
  const treeMap = new Map<ComboboxItem['value'], ComboboxTreeItem>();

  items.forEach((item) => {
    treeMap.set(item.value, item);

    if (item.parentId) {
      treeMap.get(item.parentId)?.children?.push(item);
    } else {
      root.push(item);
    }
  });

  return root.length > 0 ? root : items;
};

function Tags({
  list,
  values,
  setValues,
}: {
  list: ComboboxProps['list'];
  values: ComboboxItem['value'][];
  setValues: (values: ComboboxItem['value'][]) => void;
}) {
  if (!values.length) return <div>Select some items</div>;

  return (
    <div className="grid grid-cols-12 gap-2">
      {list
        .filter((el) => values.includes(el.value))
        .map((el) => (
          <button
            key={el.value}
            type="button"
            className="col-span-3  flex justify-between border border-gray-200 bg-gray-800 text-sm"
            onClick={(e) => {
              setValues(values.filter((v) => v !== el.value));
              e.stopPropagation();
            }}
          >
            {el.label} <img src={Close} alt="" />
          </button>
        ))}
    </div>
  );
}

export function ReactPureCombobox({
  list,
  selectLabel,
  onChange,
  enableScroll = false,
  enableSearch = false,
  showTags = false,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<ComboboxItem['value'][]>([]);
  const [filtered, setFiltered] = useState<ComboboxItem[]>(list);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const tree = useMemo(
    () =>
      createTreeFromFlatList(filtered.map((el) => ({ ...el, children: [] }))),
    [filtered],
  );

  const selectedLabel =
    values.length > 0
      ? `Items: ${list.filter((item) => values.includes(item.value)).length}`
      : selectLabel || 'Select';

  const filterList = (e: FormEvent<HTMLInputElement>) => {
    setFiltered(
      list.filter((item) =>
        item.label.toLowerCase().includes(e.currentTarget.value.toLowerCase()),
      ),
    );
  };

  const itemsLength = filtered?.length || 0;

  return (
    <>
      <div>
        {showTags && (
          <button
            ref={buttonRef}
            type="button"
            className="w-full justify-between border border-gray-200"
            onClick={() => setOpen(!open)}
          >
            <Tags setValues={setValues} list={filtered} values={values} />
          </button>
        )}
        {!showTags && (
          <button
            ref={buttonRef}
            type="button"
            className="w-full justify-between border border-gray-200"
            onClick={() => setOpen(!open)}
          >
            {selectedLabel}
          </button>
        )}
      </div>
      <Popover
        referenceElement={buttonRef.current}
        open={open}
        setOpen={setOpen}
      >
        <div>
          {enableSearch && (
            <input
              className=" p-4"
              onFocus={filterList}
              onInput={filterList}
              placeholder="Search"
            />
          )}
          <div
            className={cn(
              enableScroll && 'h-[320px]',
              'w-full bg-gray-500 p-4',
            )}
          >
            {itemsLength === 0 && <div className="text-center">No items</div>}
            <ComboboxGroup
              data={tree}
              values={values}
              onChange={onChange}
              setValues={setValues}
              setOpen={setOpen}
            />
          </div>
        </div>
      </Popover>
    </>
  );
}
