import React from 'react'
import { Card, Button, Avatar } from 'antd'
import { User } from '../../model/types'
import { EditOutlined, StarFilled, StarOutlined } from '@ant-design/icons'

interface UserCardProps {
  user: User
  onEdit: () => void
  onFavoriteChange: (isFavorited: boolean) => void
  isFavorited?: boolean
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  onEdit,
  onFavoriteChange,
  isFavorited = false,
}) => {
  return (
    <Card
      key={user.id}
      actions={[
        <EditOutlined key="edit" title="Edit" onClick={onEdit} />,
        <Button
          key="favorite"
          type={isFavorited ? 'primary' : 'default'}
          icon={isFavorited ? <StarFilled /> : <StarOutlined />}
          onClick={() => onFavoriteChange(!isFavorited)}
        >
          {isFavorited ? 'Unfavorite' : 'Favorite'}
        </Button>,
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
}

export default UserCard
