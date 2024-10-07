import * as yup from 'yup'

export const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  address: yup.object().shape({
    city: yup.string().required('City is required'),
  }),
})
