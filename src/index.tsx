import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// boostrap

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

//

import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Container>
            <App />
          </Container>
      </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
