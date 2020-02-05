import React from 'react'

import { Title, Navbar } from './Components'

export default function Home() {
  return (
    <>
      <Title />
      <Navbar category="首页" />

      <div className="container-fluid">
        <h1>HOME</h1>

        <h3 className="text-center text-muted">TODO: 简单数据统计</h3>
      </div>
    </>
  )
}