import { useState, ReactNode } from 'react';
import { usePopper } from 'react-popper';
import { useOutSideClick } from './useClickOutside';

export function Popover({
  children,
  open,
  referenceElement,
  setOpen,
}: {
  open: boolean;
  children: ReactNode;
  referenceElement: HTMLElement | null;
  setOpen: (value: boolean) => void;
}) {
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {});
  useOutSideClick({
    refs: [popperElement, referenceElement],
    onOutsideClick: () => setOpen(false),
  });

  if (!open) return null;

  return (
    <div ref={setPopperElement} style={styles.popper} {...attributes.popper}>
      {children}
    </div>
  );
}
