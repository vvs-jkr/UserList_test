import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainPage from '../pages/MainPage'
import FavoritesPage from '../pages/FavoritesPage'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store'
import { setUsers } from '../entities/user/model/userSlice'

const App: React.FC = () => {
  const dispatch = useDispatch()
  const users = useSelector((state: RootState) => state.user.users)

  React.useEffect(() => {
    const storedUsers = localStorage.getItem('users')
    if (storedUsers) {
      dispatch(setUsers(JSON.parse(storedUsers)))
    }
  }, [dispatch])

  React.useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('user', JSON.stringify(users))
    }
  }, [users])

  return (
    <Router>
      <Routes>
        <Route>
          <Route path="/" element={<MainPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
