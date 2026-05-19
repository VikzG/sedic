import { useEffect, useRef } from 'react';
import type { Direction, TransitionState } from '../hooks/usePage';

interface Props {
  id: string;
  isActive: boolean;
  direction: Direction;
  transition: TransitionState;
  children: React.ReactNode;
}

export default function PageTransition({ id, isActive, direction, transition, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Remove all animation classes first
    el.classList.remove(
      'page-entering-forward',
      'page-entering-backward',
      'page-leaving-forward',
      'page-leaving-backward',
      'page-visible',
      'page-hidden',
    );

    if (!isActive && transition === 'idle') {
      el.classList.add('page-hidden');
      return;
    }

    if (isActive && transition === 'idle') {
      el.classList.add('page-visible');
      return;
    }

    if (transition === 'leaving' && isActive) {
      el.classList.add(direction === 'forward' ? 'page-leaving-forward' : 'page-leaving-backward');
      return;
    }

    if (transition === 'entering' && isActive) {
      el.classList.add(direction === 'forward' ? 'page-entering-forward' : 'page-entering-backward');
      return;
    }

    el.classList.add('page-hidden');
  }, [isActive, direction, transition]);

  return (
    <div
      ref={ref}
      id={id}
      className="page-slot page-hidden"
      aria-hidden={!isActive}
    >
      {children}
    </div>
  );
}
