import { RootState } from 'store';

const selectSidebarVisibility = (state: RootState): boolean => state.core.sidebarVisibility;

export { selectSidebarVisibility };
