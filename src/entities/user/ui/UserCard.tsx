import React from 'react'
import { Avatar, Card, Rate } from 'antd'
import { User } from '../../../entities/user/model/types'
import { EditOutlined } from '@ant-design/icons'

interface UserCardProps {
  user: User
  isFavorited: boolean
  onEdit: () => void
  onFavoriteChange: (isFavorited: boolean) => void
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  isFavorited,
  onEdit,
  onFavoriteChange,
}) => (
  <Card
    key={user.id}
    actions={[
      <EditOutlined key="edit" title="Edit" onClick={onEdit} />,
      <Rate
        key="favorite"
        count={1}
        value={isFavorited ? 1 : 0}
        onChange={(value) => onFavoriteChange(value === 1)}
      />,
    ]}
    style={{ width: 500 }}
  >
    <Card.Meta
      avatar={
        <Avatar
          src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${user.id}`}
          style={{ width: 100, height: 100 }}
        />
      }
      title={user.username}
      description={
        <>
          <p>
            <b>Name:</b> {user.name}
          </p>
          <p>
            <b>Email:</b> {user.email}
          </p>
          <p>
            <b>City:</b> {user.address.city}
          </p>
        </>
      }
    />
  </Card>
)

export default UserCard
