import Sidebar from "@/components/ui/sidebar"
import { auth } from "@/auth";

const Pricing = async () => {

  const session = await auth();

  return (
    <div className="flex h-screen">
      <Sidebar session={session}/>
      Pricing
    </div>
  )
}

export default Pricing