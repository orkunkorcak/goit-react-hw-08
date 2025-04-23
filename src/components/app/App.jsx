import { Suspense, useState } from 'react'
import css from './App.module.css'
import AppBar from '../appBar/AppBar'
import { Routes, Route } from 'react-router-dom'
import { lazy } from 'react'

const HomePage = lazy(() => import('../../pages/home/HomePage'))
function App() {

  return (
    <>
      <AppBar />
      <Suspense>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
