export interface User {
  id: number
  name: string
  username: string
  email: string
  address: {
    city: string
  }
}

export interface UserFormValues {
  username: string
  name: string
  email: string
  address: {
    city: string
  }
}

export interface UserModalProps {
  visible: boolean
  onCancel: () => void
  onSubmit: (data: User) => void
  currentUser?: User | null
}
