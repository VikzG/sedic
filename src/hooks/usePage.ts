import { useState, useCallback, useRef } from 'react';

export type PageId = 'home' | 'about' | 'mission' | 'projects' | 'partners' | 'news' | 'contact';

export const PAGE_ORDER: PageId[] = ['home', 'about', 'mission', 'projects', 'partners', 'news', 'contact'];

export type Direction = 'forward' | 'backward';
export type TransitionState = 'idle' | 'leaving' | 'entering';

export interface PageState {
  current: PageId;
  previous: PageId | null;
  direction: Direction;
  transition: TransitionState;
}

export const TRANSITION_MS = 650;

export function usePage() {
  const [state, setState] = useState<PageState>({
    current: 'home',
    previous: null,
    direction: 'forward',
    transition: 'idle',
  });

  const animating = useRef(false);
  const pendingTarget = useRef<PageId | null>(null);

  const navigate = useCallback((target: PageId) => {
    if (animating.current) {
      pendingTarget.current = target;
      return;
    }

    setState(prev => {
      if (prev.current === target) return prev;
      const fromIdx = PAGE_ORDER.indexOf(prev.current);
      const toIdx = PAGE_ORDER.indexOf(target);
      const direction: Direction = toIdx >= fromIdx ? 'forward' : 'backward';
      animating.current = true;
      return { current: prev.current, previous: prev.current, direction, transition: 'leaving' };
    });

    setTimeout(() => {
      setState(prev => ({ ...prev, current: target, transition: 'entering' }));

      setTimeout(() => {
        setState(prev => ({ ...prev, transition: 'idle', previous: null }));
        animating.current = false;

        if (pendingTarget.current) {
          const next = pendingTarget.current;
          pendingTarget.current = null;
          navigate(next);
        }
      }, TRANSITION_MS);
    }, TRANSITION_MS);
  }, []); // eslint-disable-line

  return { state, navigate };
}
