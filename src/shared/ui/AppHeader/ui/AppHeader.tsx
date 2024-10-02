import React from 'react'
import { Button, Input, Layout, Tooltip } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import Modal from '../../../../pages/UserModal/UserModal'
import { HeaderProps } from './appHeader.model'
import { useNavigate } from 'react-router-dom'

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
  onAddUser,
  onSearch,
  hideCreateUserButton,
}) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false)
  const navigate = useNavigate()
  const handleNavigateToFavorites = () => {
    navigate('/favorites') // Переход на страницу избранных пользователей
  }

  const handleCreateUser = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <>
      <Layout.Header style={headerStyle}>
        <Input
          style={{ width: 300, marginRight: 50 }}
          placeholder="Search by name"
          suffix={
            <Tooltip>
              <SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
          }
          onChange={(e) => onSearch(e.target.value)}
        />

        {!hideCreateUserButton && (
          <Button
            onClick={handleCreateUser}
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
          onClick={handleNavigateToFavorites}
          type="primary"
          style={{ backgroundColor: 'white', color: 'black', gap: 50 }}
        >
          Go to Favorite Users
        </Button>
      </Layout.Header>

      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        onSubmit={(data) => {
          console.log('Добавлен пользователь:', data)
          if (onAddUser) {
            onAddUser(data)
          }
          setIsModalVisible(false)
        }}
      />
    </>
  )
}

export default AppHeader
