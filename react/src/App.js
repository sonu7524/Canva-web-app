import './App.css'
import EditingPage from './pages/EditingPage'
import React from 'react'
import { Provider } from 'react-redux'
import store from './store'


function App() {

  return (
    <Provider store={store}>
      <EditingPage />
    </Provider>
  )
}

export default App
