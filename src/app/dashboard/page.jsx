import Navbar from '@/components/ui/navbar.jsx'
import CreateProjectButton from '@/components/createProject/createProjectButton'
import FileUploaderInput from '@/components/fileUploader/fileUploaderButton'
import { auth } from '@/auth'
import { fetchAllProjectsForAParticularUser } from '@/app/server/actions';
import ProjectDashboardCard from "@/components/ui/projectDashboardCard"
import DashboardFileDisplayer from './dashboardFileDisplayer'
import Sidebar from '@/components/ui/sidebar';


async function Dashboard() {

  const session = await auth();
  const projects = await fetchAllProjectsForAParticularUser();


  const finalProjectObjectsForAUser = projects.map((projectObject) => {
    return {
      memberId: projectObject.data.memberId,
      memberName: session.user.name,
      projectId: projectObject.data.projectId,
      projectName: projectObject.response.projectName,
      access: projectObject.data.access,
      projectCreatedAt: projectObject.response.createdAt,
      projectLastUpdatedAt: projectObject.response.updatedAt,
      projectLastUpdatedBy: projectObject.response.updatedBy,
      addedAt: projectObject.data.addedAt,
      updatedUserConfigAt: projectObject.data.updatedUserConfigAt,
      userConfigUpdater: projectObject.data.userConfigUpdater
    }
  })

  return (
    <div className='flex h-screen'>
      <Sidebar session={session} />
        {/* <Navbar /> */}
        <div className='flex gap-x-2 px-2 h-screen w-full '>
          <div className='w-[40%] bg-background p-3 gap-y-4 flex flex-col'>
            <FileUploaderInput session={session} className={'h-[70px]'} />
            <DashboardFileDisplayer />

          </div>
          <div className='w-[60%] bg-background p-3 gap-y-4 flex flex-col'>
            <CreateProjectButton session={session} className={'h-[70px]'} />
            <div className='rounded flex-1 p-2 bg-background border flex flex-col gap-y-[8px] overflow-y-auto scrollbar-thin scrollbar-thumb-foreground scrollbar-track-background '>
              {finalProjectObjectsForAUser.map((ProjectInfoObject, index) => {
                return <ProjectDashboardCard key={index} projectCardObject={ProjectInfoObject} />
              })}
            </div>
          </div>
        </div>

    </div>
  )
}

export default Dashboard