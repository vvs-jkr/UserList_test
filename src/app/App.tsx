import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from './layout'
import MainPage from '../pages/main/ui/MainPage'
import FavoritePage from '../pages/favorite-users/ui/FavoritePage'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="/favorites" element={<FavoritePage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
