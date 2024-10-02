import React from 'react'
import { Button, Input, Modal, Form as AntForm } from 'antd'
import { useForm } from 'react-hook-form'
import { User } from '../../entities/user/model/types'

interface UserModalProps {
  visible: boolean
  onCancel: () => void
  onSubmit: (data: User) => void
  currentUser?: User | null
}

const UserModal: React.FC<UserModalProps> = ({
  visible,
  onCancel,
  onSubmit,
  currentUser,
}) => {
  const { register, handleSubmit, setValue, reset } = useForm<User>()

  React.useEffect(() => {
    if (currentUser) {
      // Предзаполняем форму, если редактируется пользователь
      setValue('name', currentUser.name)
      setValue('email', currentUser.email)
    } else {
      // Очищаем форму для добавления нового пользователя
      reset()
    }
  }, [currentUser, setValue, reset])

  return (
    <Modal
      title={
        currentUser ? 'Редактировать пользователя' : 'Добавить пользователя'
      }
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <AntForm layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <AntForm.Item label="Name">
          <Input {...register('name', { required: true })} />
        </AntForm.Item>
        <AntForm.Item label="Email">
          <Input {...register('email', { required: true })} />
        </AntForm.Item>
        <AntForm.Item label="City">
          <Input {...register('address.city', { required: true })} />
        </AntForm.Item>
        <AntForm.Item>
          <Button type="primary" htmlType="submit">
            {currentUser ? 'Сохранить' : 'Добавить'}
          </Button>
        </AntForm.Item>
      </AntForm>
    </Modal>
  )
}

export default UserModal
