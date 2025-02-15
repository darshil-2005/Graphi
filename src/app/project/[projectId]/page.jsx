import Project from '@/components/project/project.jsx'
import Navbar from '@/components/ui/navbar.jsx'
import Sidebar from '@/components/ui/sidebar';
import { auth } from '@/auth';

async function Dashboard( {params} ){

  const urlParams = await params;
  const projectId = urlParams.projectId;

  const session = await auth();

  return (
    <div className='flex overflow-hidden h-screen'>
      {/* <Navbar/> */}

      <Sidebar session={session}/>

      <Project projectId={projectId}/>
    </div>

  )
}

export default Dashboard