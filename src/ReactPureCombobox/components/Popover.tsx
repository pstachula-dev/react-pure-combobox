import { useState, ReactNode, useEffect } from 'react';
import { usePopper } from 'react-popper';
import { useOutSideClick } from './useClickOutside';
import { ComboboxItem } from '../ReactPureCombobox.types';

export function Popover({
  children,
  open,
  values,
  referenceElement,
  setOpen,
}: {
  open: boolean;
  children: ReactNode;
  referenceElement: HTMLElement | null;
  values: ComboboxItem['value'][];
  setOpen: (value: boolean) => void;
}) {
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const { styles, attributes, update } = usePopper(
    referenceElement,
    popperElement,
  );
  useOutSideClick({
    refs: [popperElement, referenceElement],
    onOutsideClick: () => setOpen(false),
  });

  useEffect(() => {
    update?.();
  }, [update, values]);

  if (!open) return null;

  return (
    <div ref={setPopperElement} style={styles.popper} {...attributes.popper}>
      {children}
    </div>
  );
}
