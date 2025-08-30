import type { TWsActions } from '@/utils/store-types';
import type { Middleware } from '@reduxjs/toolkit';

import type { RootState } from '../store';

export const socketMiddleware = <R, S>(
	wsActions: TWsActions<R, S>
): Middleware<object, RootState> => {
	return (store) => {
		let socket: WebSocket | null = null;
		const { connect, sendMessage, onError, onMessage, disconnect } = wsActions;
		const { dispatch } = store;

		return (next) => (action) => {
			if (connect.match(action)) {
				if (
					socket?.readyState === WebSocket.OPEN ||
					socket?.readyState === WebSocket.CONNECTING
				) {
					return;
				}

				const url = action.payload;
				socket = new WebSocket(url);

				socket.onerror = (): void => {
					dispatch(onError('Ошибка при работе с соединением'));
				};

				socket.onmessage = (event): void => {
					const { data } = event;
					try {
						const parsedData = JSON.parse(data);
						console.info(parsedData);
						dispatch(onMessage(parsedData));
					} catch (error) {
						dispatch(onError((error as Error).message));
					}
				};

				return;
			}

			if (sendMessage?.match(action) && socket) {
				try {
					socket.send(JSON.stringify(action.payload));
				} catch (error) {
					dispatch(onError((error as Error).message));
				}

				return;
			}

			if (disconnect.match(action)) {
				if (socket?.readyState === WebSocket.OPEN) {
					socket?.close(1000);
					socket = null;
				}

				return;
			}

			next(action);
		};
	};
};
