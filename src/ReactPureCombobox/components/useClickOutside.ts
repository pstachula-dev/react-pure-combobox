import { useEffect } from 'react';

export const useOutSideClick = ({
  refs,
  onOutsideClick,
}: {
  refs: (HTMLElement | null)[];
  onOutsideClick: () => void;
}) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isOutsideAllRefs = refs.every(
        (ref) => ref && !ref.contains(event.target as Node),
      );
      if (isOutsideAllRefs) onOutsideClick();
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onOutsideClick, refs]);
};
