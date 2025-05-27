import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@components/app/app.jsx';
import { Provider } from 'react-redux';
import { store } from './services/store/index';
import './index.css';

createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
