import { auth } from "@/auth"
import Sidebar from "@/components/ui/sidebar"
import Navbar from "@/components/ui/navbar";


const Tutorial = async () => {

  const session = await auth();

  return (
    <div className="flex h-screen">
      <Sidebar session={session}/>
      Tutorial
    </div>
  )
}

export default Tutorial