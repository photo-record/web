import { atom } from 'recoil';

export const isToggleAtom = atom({
  key: 'isToggle',
  default: false,
});

export const isLoading = atom({
  key: 'isLoading',
  default: false,
});
