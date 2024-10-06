import React from 'react'
import { Button, Input, Layout, Tooltip } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { HeaderProps } from './appHeader.model'
import { useNavigate } from 'react-router-dom'
import { User } from '../../../../entities/user/model/types'
import useDebounce from '../../../../shared/lib/utils/useDebounce'
import UserModal from '../../../../features/user/ui/UserModal'

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
  setFilteredUsers,
}) => {
  const navigate = useNavigate()
  const [isAddModalVisible, setIsAddModalVisible] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState('')

  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const previousTerm = React.useRef(debouncedSearchTerm)

  const handleNavigateToFavorites = () => {
    navigate('/favorites')
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  React.useEffect(() => {
    if (previousTerm.current !== debouncedSearchTerm) {
      onSearch(debouncedSearchTerm)
      previousTerm.current = debouncedSearchTerm
    }
  }, [debouncedSearchTerm, onSearch])

  const handleCreateUser = (newUser: User) => {
    setFilteredUsers((prev) => [...prev, newUser])
    setIsAddModalVisible(false)
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
          onClick={handleNavigateToFavorites}
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
