import React from 'react'
import { Button, Input, Layout, Tooltip } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { HeaderProps } from './appHeader.model'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { User } from '../../../entities/user/model/types'
import { addUser } from '../../../entities/user/model/userSlice'
import UserModal from '../../../features/user/UserModal/ui/UserModal'
import { SearchBar } from '../../../features/user'

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 100,
  paddingInline: 48,
  alignContent: 'center',
  lineHeight: '64px',
  backgroundColor: '#4096ff',
}

const AppHeader: React.FC<HeaderProps> = ({
  onSearch,
  hideCreateUserButton,
  searchTerm,
}) => {
  const [isAddModalVisible, setIsAddModalVisible] = React.useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleCreateUser = (newUser: User) => {
    dispatch(addUser(newUser))
    setIsAddModalVisible(false)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
  }

  const handleGoToFavorites = () => {
    navigate('/favorites')
  }

  return (
    <>
      <Layout.Header style={headerStyle}>
		<SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        {!hideCreateUserButton && (
          <Button
            onClick={() => setIsAddModalVisible(true)}
            type="primary"
            style={{
              backgroundColor: 'white',
              color: 'black',
              marginRight: 20,
            }}
          >
            Create user
          </Button>
        )}
        <Button
          onClick={handleGoToFavorites}
          type="primary"
          style={{ backgroundColor: 'white', color: 'black', gap: 50 }}
        >
          Go to Favorite Users
        </Button>
      </Layout.Header>

      <UserModal
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        onSubmit={handleCreateUser}
      />
    </>
  )
}

export default AppHeader
