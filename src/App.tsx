import { FC } from 'react';

// 

import {Routes, Route } from 'react-router-dom';

// elements

import LoginPage from './components/element/LoginPage/LoginPage';
import AdminPage from './components/element/AdminPage/AdminPage';
import CardsPage from './components/element/CardsPage/CardsPage';
import OpenCardElement from './components/element/OpenCardElement/OpenCardElement';

const App = () => {
  return (

      <Routes>

          <Route path="/admin/login" element={<LoginPage />} />

          {/*  */}

          <Route path="/admin" element={<AdminPage />} />

          {/*  */}

          <Route path="/admin/:endpoint" element={<CardsPage />} />
          <Route path="/admin/:endpoint/:id" element={<OpenCardElement />} />


      </Routes>

  )
}

export default App
