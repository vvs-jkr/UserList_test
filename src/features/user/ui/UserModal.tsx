import React from 'react'
import { Button, Input, Modal, Form as AntForm } from 'antd'
import { useForm } from 'react-hook-form'
import {
  User,
  UserFormValues,
  UserModalProps,
} from '../../../entities/user/model/types'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from '../../../entities/user/model/validation'

const UserModal: React.FC<UserModalProps> = ({
  visible,
  onCancel,
  onSubmit,
  currentUser,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: yupResolver(schema),
  })

  React.useEffect(() => {
    if (currentUser) {
      setValue('name', currentUser.name)
      setValue('email', currentUser.email)
      setValue('address.city', currentUser.address.city)
    } else {
      reset({
        name: '',
        email: '',
        address: { city: '' },
      })
    }
  }, [currentUser, setValue, reset])

  const handleFormSubmit = (newUserData: UserFormValues) => {
    console.log('Form values before submission:', newUserData)

    const newUser: User = {
      id: currentUser?.id || Date.now(),
      username: currentUser?.username || 'default_username',
      ...newUserData,
    }

    console.log('Submitted user:', newUser)
    onSubmit(newUser)
  }

  return (
    <Modal
      title={currentUser ? 'Edit user' : 'Create user'}
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <AntForm layout="vertical" onFinish={handleSubmit(handleFormSubmit)}>
        <AntForm.Item
          label="Name"
          validateStatus={errors.name ? 'error' : ''}
          help={errors.name?.message}
        >
          <Input {...register('name')} />
        </AntForm.Item>

        <AntForm.Item
          label="Email"
          validateStatus={errors.email ? 'error' : ''}
          help={errors.email?.message}
        >
          <Input {...register('email')} />
        </AntForm.Item>

        <AntForm.Item
          label="City"
          validateStatus={errors.address?.city ? 'error' : ''}
          help={errors.address?.city?.message}
        >
          <Input {...register('address.city')} />
        </AntForm.Item>

        <AntForm.Item>
          <Button type="primary" htmlType="submit">
            {currentUser ? 'Save' : 'Create'}
          </Button>
        </AntForm.Item>
      </AntForm>
    </Modal>
  )
}

export default UserModal
