import React from 'react'
import { Button, Modal, Form as AntForm, Input } from 'antd'
import { Controller, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from '../../../../entities/user/model/validation'
import {
  User,
  UserFormValues,
  UserModalProps,
} from '../../../../entities/user/model/types'

const defaultFormValues = {
  name: '',
  email: '',
  username: '',
  address: { city: '' },
}

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
    defaultValues: currentUser || defaultFormValues,
  })

  React.useEffect(() => {
    if (visible) {
      reset(currentUser || defaultFormValues)
    }
  }, [visible, currentUser, reset])

  const handleFormSubmit = (newUserData: UserFormValues) => {
    const newUser: User = {
      id: currentUser?.id || Date.now() % 1000,
      ...newUserData,
    }

    onSubmit(newUser)
    onCancel()
  }

  const getValidationStatus = (field: keyof typeof errors) =>
    errors[field] ? 'error' : ''

  return (
    <Modal
      title={currentUser ? 'Edit user' : 'Create user'}
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <AntForm layout="vertical" onFinish={handleSubmit(handleFormSubmit)}>
        {['username', 'name', 'email'].map((field) => (
          <AntForm.Item
            key={field}
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            validateStatus={getValidationStatus(field as keyof UserFormValues)}
            help={errors[field as keyof UserFormValues]?.message}
          >
            <Controller
              name={field as keyof UserFormValues}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  value={typeof field.value === 'string' ? field.value : ''}
                />
              )}
            />
          </AntForm.Item>
        ))}

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
