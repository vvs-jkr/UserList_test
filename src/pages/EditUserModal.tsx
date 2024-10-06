import React from 'react'
import { Modal, Form, Input } from 'antd'
import { User } from '../entities/user/model/types'

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
  const [form] = Form.useForm()

  React.useEffect(() => {
    if (user) {
      form.resetFields()
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        address: { city: user.address.city || '' },
      })
    }
  }, [user, form])

  const handleFinish = (values: {
    name: string
    email: string
    address: { city: string }
  }) => {
    if (user) {
      onSubmit({
        ...user,
        name: values.name,
        email: values.email,
        address: {
          ...user.address,
          city: values.address.city,
        },
      })
    }
  }

  return (
    <Modal
      title="Edit User"
      open={visible}
      onCancel={onCancel}
      onOk={form.submit}
    >
      <Form form={form} onFinish={handleFinish}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input the name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Please input the email!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['address', 'city']}
          label="City"
          rules={[{ required: true, message: 'Please input the city!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditUserModal
