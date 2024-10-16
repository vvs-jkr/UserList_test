import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Layout as AntLayout } from 'antd'
import AppHeader from '../../../../widgets/Header/ui/AppHeader'
import { useFilteredUsers } from '../../../../shared/hooks/useFilteredUsers'
import { useUserManagement } from '../../../../shared/hooks/useUserManagement'

const Layout: React.FC = () => {
  const location = useLocation()
  const isFavoritePage = location.pathname === '/favorites'

  const { searchTerm, handleSearchChange } = useFilteredUsers()
  const { handleCreateUser } = useUserManagement()

  return (
    <>
      <AppHeader
        hideCreateUserButton={isFavoritePage}
        onSearch={handleSearchChange}
        searchTerm={searchTerm}
        onCreateUser={handleCreateUser}
      />
      <AntLayout.Content>
        <Outlet />
      </AntLayout.Content>
    </>
  )
}

export default Layout
