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
  filtered,
  values,
  setValues,
  setFiltered,
}: {
  filtered: ComboboxProps['list'];
  list: ComboboxProps['list'];
  values: ComboboxItem['value'][];
  setValues: (values: ComboboxItem['value'][]) => void;
  setFiltered: (values: ComboboxItem[]) => void;
}) {
  if (!values?.length || !list?.length) return <div>Select some items</div>;

  return (
    <div className="flex flex-wrap">
      {list
        .filter((el) => values.includes(el.value))
        .map((el) => (
          <div
            aria-hidden="true"
            key={el.value}
            className="m-1 inline-flex min-w-[40px] bg-zinc-700 p-1 text-xs"
            onClick={(e) => {
              setValues(values.filter((v) => v !== el.value));
              setFiltered([...filtered, el]);
              e.stopPropagation();
            }}
          >
            <span>{el.label}</span>{' '}
            <img src={Close} className="ml-1 w-4" alt="" />
          </div>
        ))}
    </div>
  );
}

export function ReactPureCombobox({
  list,
  selectLabel,
  onChange,
  showScroll = false,
  showSearch = false,
  showTags = false,
  showCheckboxes = false,
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

  const itemsLength = filtered?.length || 0;
  const omitSelectedItems = !showCheckboxes;

  const selectedLabel =
    values.length > 0
      ? `Items: ${list.filter((item) => values.includes(item.value)).length}`
      : selectLabel || 'Select';

  const filterList = (e: FormEvent<HTMLInputElement>) => {
    const currVal = e.currentTarget.value.toLowerCase();
    const newData = list.filter((item) =>
      item.label.toLowerCase().includes(currVal),
    );
    if (omitSelectedItems) {
      setFiltered(newData.filter((el) => !values.includes(el.value)));
    } else {
      setFiltered(newData);
    }
  };

  return (
    <>
      <div>
        {showTags && (
          <button
            ref={buttonRef}
            type="button"
            className="justify-between rounded bg-zinc-900 px-4 py-2"
            onClick={() => setOpen(!open)}
          >
            <Tags
              setFiltered={setFiltered}
              setValues={setValues}
              filtered={filtered}
              list={list}
              values={values}
            />
          </button>
        )}
        {!showTags && (
          <button
            ref={buttonRef}
            type="button"
            className="justify-between rounded bg-zinc-900 px-4 py-2"
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
        values={values}
      >
        <div>
          {showSearch && (
            <input
              className="bg-zinc-800 p-4"
              onFocus={filterList}
              onInput={filterList}
              placeholder="Search"
            />
          )}
          <div
            className={cn(showScroll && 'h-[320px]', 'w-full bg-zinc-900 p-4')}
          >
            {itemsLength === 0 && <div className="text-center">No items</div>}
            <ComboboxGroup
              data={tree}
              list={list}
              values={values}
              omitSelectedItems={omitSelectedItems}
              showCheckboxes={showCheckboxes}
              onChange={onChange}
              setValues={setValues}
              setFiltered={setFiltered}
            />
          </div>
        </div>
      </Popover>
    </>
  );
}
