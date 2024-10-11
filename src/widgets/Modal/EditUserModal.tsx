import React from 'react'
import { Modal } from 'antd'
import { User, UserFormValues } from '../../entities/user/model/types'
import UserModal from '../../features/user/ui/UserModal'

interface EditUserModalProps {
  visible: boolean
  user: User | null
  onCancel: () => void
  onSubmit: (user: User) => void
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  visible,
  user,
  onCancel,
  onSubmit,
}) => {
  const handleFormSubmit = (newUserData: UserFormValues) => {
    if (user) {
      onSubmit({
        ...user,
        ...newUserData,
      })
    }
    onCancel()
  }

  return (
    <Modal key={user?.id} title="Edit User" open={visible} footer={null}>
      <UserModal
        visible={visible}
        onCancel={onCancel}
        onSubmit={handleFormSubmit}
        currentUser={user}
      />
    </Modal>
  )
}

export default EditUserModal
