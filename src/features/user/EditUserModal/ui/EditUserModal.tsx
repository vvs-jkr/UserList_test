import React from 'react'
import { Modal } from 'antd'

import { UserModal } from '../../UserModal'
import { User, UserModalProps } from '../../../../entities/user/model/types'

interface EditUserModalProps extends UserModalProps {
  user: User | null
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  visible,
  user,
  onCancel,
  onSubmit,
}) => {
  const [formData, setFormData] = React.useState<User | null>(user)

  React.useEffect(() => {
    setFormData(user) // Обновляем состояние формы при изменении пользователя
  }, [user])

  const handleFormSubmit = (newUserData: User) => {
    if (newUserData) {
      onSubmit(newUserData)
    }
    setFormData(null)
  }

  return (
    <UserModal
      visible={visible}
      currentUser={user}
      onCancel={onCancel}
      onSubmit={handleFormSubmit}
    />
  )
}

export default EditUserModal
