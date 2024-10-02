import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage/MainPage'
import FavoritesPage from './pages/FavoritesPage/FavoritesPage'

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route>
        <Route path="/" element={<MainPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Route>
    </Routes>
  </Router>
)

export default App
