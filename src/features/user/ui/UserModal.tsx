import React from 'react'
import { Button, Input, Modal, Form as AntForm } from 'antd'
import { Controller, useForm } from 'react-hook-form'
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
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<UserFormValues>({
    resolver: yupResolver(schema),
    defaultValues: currentUser || {
      name: '',
      email: '',
      username: '',
      address: { city: '' },
    },
  })

  React.useEffect(() => {
    if (visible && !currentUser) {
      reset({
        name: '',
        email: '',
        username: '',
        address: { city: '' },
      })
    }
  }, [visible, currentUser])

  const handleFormSubmit = (newUserData: UserFormValues) => {
    const newUser: User = {
      id: currentUser?.id || Date.now() % 1000,
      ...newUserData,
    }

    onSubmit(newUser)
    reset(newUserData)
    onCancel()
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
          label="Username"
          validateStatus={errors.username ? 'error' : ''}
          help={errors.username?.message}
        >
          <Controller
            name="username"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </AntForm.Item>

        <AntForm.Item
          label="Name"
          validateStatus={errors.name ? 'error' : ''}
          help={errors.name?.message}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </AntForm.Item>

        <AntForm.Item
          label="Email"
          validateStatus={errors.email ? 'error' : ''}
          help={errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </AntForm.Item>

        <AntForm.Item
          label="City"
          validateStatus={errors.address?.city ? 'error' : ''}
          help={errors.address?.city?.message}
        >
          <Controller
            name="address.city"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
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
