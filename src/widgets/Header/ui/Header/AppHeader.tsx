import React from 'react'
import { Button, Input, Layout, Tooltip } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { HeaderProps } from './appHeader.model'
import UserModal from '../../../../features/user/ui/UserModal'
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
  onSearch,
  hideCreateUserButton,
  onCreateUser,
  searchTerm,
}) => {
  const [isAddModalVisible, setIsAddModalVisible] = React.useState(false)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    onSearch(value)
  }

  const navigate = useNavigate()

  const handleGoToFavorites = () => {
    navigate('/favorites')
  }

  return (
    <>
      <Layout.Header style={headerStyle}>
        <Input
          style={{ width: 300, marginRight: 50 }}
          placeholder="Search by name"
          value={searchTerm}
          suffix={
            <Tooltip>
              <SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
          }
          onChange={handleSearchChange}
        />

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
        onSubmit={onCreateUser}
      />
    </>
  )
}

export default AppHeader
