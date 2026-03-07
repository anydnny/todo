import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.documentElement;

const setPointerModality = () => {
  rootElement.dataset.inputModality = 'pointer';
};

const setKeyboardModality = (event: KeyboardEvent) => {
  if (event.key === 'Tab') {
    rootElement.dataset.inputModality = 'keyboard';
  }
};

window.addEventListener('pointerdown', setPointerModality, true);
window.addEventListener('keydown', setKeyboardModality, true);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
