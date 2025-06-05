// main.jsx
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './app/store';
import 'aos/dist/aos.css';
import AOS from 'aos';

function MainApp() {
  useEffect(() => {
    AOS.init({ once: true, duration: 700, offset: 80 });
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<MainApp />);
