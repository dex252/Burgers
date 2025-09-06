import { useDispatch, useSelector } from 'react-redux';

import type { ThunkAction, UnknownAction } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';

import type { store } from '../services/store/index';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	UnknownAction
>;

export const useAppDispatch: () => AppDispatch = () =>
	useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
