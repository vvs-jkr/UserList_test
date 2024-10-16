import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainPage from '../../pages/main/ui/MainPage'
import FavoritePage from '../../pages/favorite-users/ui/FavoritePage'
import { Layout } from '../layout'

const ROUTES = {
  main: '/',
  favorites: '/favorites',
}

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path={ROUTES.main} element={<MainPage />} />
          <Route path={ROUTES.favorites} element={<FavoritePage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
