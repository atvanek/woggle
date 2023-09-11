import { useSelector, useDispatch } from 'react-redux'
import { RootState, RootDispatch } from './store';
import { TypedUseSelectorHook } from 'react-redux';

export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useRootDispatch: () => RootDispatch = useDispatch;
