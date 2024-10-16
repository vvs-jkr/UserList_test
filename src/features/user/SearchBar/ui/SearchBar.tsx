import React from 'react'
import { Input, Tooltip } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { setSearchTermFavorite } from '../../../../entities/user/model/userSlice'

interface SearchBarProps {
  searchTerm: string
  onSearchChange: (searchTerm: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm }) => {
  const dispatch = useDispatch()

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTermFavorite(e.target.value))
  }

  return (
    <Input
      style={{ width: 300, marginRight: 50 }}
      placeholder="Search by name"
      value={searchTerm}
      suffix={
        <Tooltip title="Search">
          <SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
        </Tooltip>
      }
      onChange={handleSearchChange}
    />
  )
}

export default SearchBar
