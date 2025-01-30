import React from 'react'
import Project from '@/components/project/project.jsx'
import Navbar from '@/components/ui/navbar.jsx'

async function Dashboard( {params} ){

  const urlParams = await params;
  const projectId = urlParams.projectId;

  return (
    <div>

      <Navbar/>
      <Project projectId={projectId}/>pproject

    </div>

  )
}

export default Dashboard