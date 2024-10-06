import React from 'react'
import { Avatar, Card, Button } from 'antd'
import { User } from '../../../entities/user/model/types'

interface FavoriteUserCardProps {
  user: User
  onRemove: () => void
}

const FavoriteUserCard: React.FC<FavoriteUserCardProps> = ({
  user,
  onRemove,
}) => (
  <Card style={{ margin: '10px 0', width: 500 }}>
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
          <Button
            color="danger"
            variant="solid"
            onClick={onRemove}
            style={{ marginTop: '25px' }}
          >
            Delete
          </Button>
        </>
      }
    />
  </Card>
)

export default FavoriteUserCard
