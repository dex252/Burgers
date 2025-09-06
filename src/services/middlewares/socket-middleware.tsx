import { refreshToken } from '../api/yandex_api';

import type { TWsActions } from '@/utils/store-types';
import type { Middleware } from '@reduxjs/toolkit';

import type { RootState } from '../store';

export const socketMiddleware = <R, S>(
	wsActions: TWsActions<R, S>,
	withTokenRefresh = false
): Middleware<object, RootState> => {
	return (store) => {
		let socket: WebSocket | null = null;
		const { connect, sendMessage, onError, onMessage, disconnect } = wsActions;
		const { dispatch } = store;
		let url = '';

		return (next) => (action) => {
			if (connect.match(action)) {
				if (
					socket?.readyState === WebSocket.OPEN ||
					socket?.readyState === WebSocket.CONNECTING
				) {
					return;
				}

				url = action.payload;
				const wssUrl = getUrlWithToken();

				socket = new WebSocket(wssUrl);

				socket.onerror = (): void => {
					dispatch(onError('Ошибка при работе с соединением'));
				};

				socket.onmessage = (event): void => {
					const { data } = event;
					try {
						const parsedData = JSON.parse(data);
						//console.info(parsedData);
						if (
							withTokenRefresh &&
							parsedData.message === 'Invalid or missing token'
						) {
							refreshToken()
								.then(() => {
									const wssUrl = getUrlWithToken();
									dispatch(connect(wssUrl));
								})
								.catch((error) => {
									dispatch(onError((error as Error).message));
								});

							dispatch(disconnect());
							return;
						}

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

			function getUrlWithToken(): string {
				let wslUrl = url;
				if (withTokenRefresh) {
					const accessTokenWithBearer = localStorage.getItem('accessToken');
					const token = accessTokenWithBearer?.replace(/^\s*Bearer\s*/i, '');
					wslUrl = `${wslUrl}?token=${token}`;
				}

				return wslUrl;
			}
		};
	};
};
