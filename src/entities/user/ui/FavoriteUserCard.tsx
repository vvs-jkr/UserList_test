import React from 'react'
import { Avatar, Card, Button } from 'antd'
import { User } from '../model/types'
import { EditOutlined } from '@ant-design/icons'

interface FavoriteUserCardProps {
  user: User
  onRemove: () => void
  onEdit: () => void
}

const FavoriteUserCard: React.FC<FavoriteUserCardProps> = ({
  user,
  onRemove,
  onEdit,
}) => (
  <Card
    key={user.id}
    actions={[
      <EditOutlined key="edit" title="Edit" onClick={onEdit} />,
      <Button
        color="danger"
        variant="solid"
        onClick={onRemove}
      >
        Delete
      </Button>,
    ]}
    style={{ margin: '10px 0', width: 500 }}
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

export default FavoriteUserCard
