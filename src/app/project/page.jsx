import React from 'react'
import Project from '@/components/project/project.jsx'
import Navbar from '@/components/ui/navbar.jsx'

async function Dashboard(){
  return (
    <div>
      <Navbar/>
      <Project/>
    </div>

  )
}

export default Dashboard