import ReactDOM from 'react-dom/client'
import '../entry/style.css'
import React from 'react'
import App from './App'
import { Provider } from 'react-redux'
import { store } from '../../shared/store/store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
