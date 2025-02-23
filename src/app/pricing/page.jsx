import Sidebar from "@/components/ui/sidebar"
import { auth } from "@/auth";
import {
  Card
} from "@/components/ui/shadcnComponent/card"
import { Button } from "@/components/ui/shadcnComponent/button";
import { Orbitron } from "next/font/google";
import { Separator } from "@/components/ui/shadcnComponent/separator";

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700'] });

const Pricing = async () => {

  const session = await auth();

  return (
    <div className="flex h-screen">
      <Sidebar session={session} />
      <div className="flex flex-col flex-1 px-4 bg-[radial-gradient(circle_at_top_left,_rgba(0,0,0,0.1)_0%,_transparent_60%),_radial-gradient(circle_at_bottom_right,_rgba(0,0,0,0.1)_0%,_transparent_60%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.06)_0%,_transparent_60%),_radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.06)_0%,_transparent_60%)]">
        <span className={`text-6xl h-[18vh] tracking-widest flex items-center justify-center ${orbitron.className}`}>
          Pricing
        </span>
        {/* <Separator/> */}
        <div className="flex flex-1 pt-8 gap-12 justify-center">

          <Card className="h-[28rem] w-[24rem] shadow-xl flex flex-col items-center bg-back rounded-2xl p-6 border hover:scale-105 transition-transform duration-500">

            <span className="mt-4 text-4xl text-gray-800 dark:text-gray-100">Basic Pack</span>



            <img src="/coin2.png" alt="Pro Credits" className="mt-6 h-40 w-40 object-contain" />

            <div className="flex flex-col items-center mt-6">
              <span className="font-semibold text-4xl text-gray-700 dark:text-gray-300">
                100 Credits
              </span>

            </div>


            <Button className="mt-8 w-full max-w-[20rem] py-3 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400">
              BUY FOR $12
            </Button>

          </Card>


          <Card className="h-[28rem] w-[24rem] shadow-xl flex flex-col items-center bg-back rounded-2xl p-6 border hover:scale-105 transition-transform duration-500">

          <span className="text-gray-800 dark:text-gray-100 mt-4 text-4xl">Pro Pack</span>

            <img src="/coin2.png" alt="Pro Credits" className="mt-6 h-40 w-40 object-contain" />

            <div className="flex flex-col items-center mt-6">
              <span className="font-semibold text-4xl text-gray-700 dark:text-gray-300">
                200 Credits
              </span>

            </div>


            <Button className="mt-8 w-full max-w-[20rem] py-3 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400">
              BUY FOR $20
            </Button>

          </Card>



          <Card className="h-[28rem] w-[24rem] shadow-xl flex flex-col items-center bg-back rounded-2xl p-6 border hover:scale-105 transition-transform duration-500">

            <span className="mt-4 text-4xl text-gray-800 dark:text-gray-100">Premium Pack</span>



            <img src="/coin2.png" alt="Pro Credits" className="mt-6 h-40 w-40 object-contain" />

            <div className="flex flex-col items-center mt-6">
              <span className="font-semibold text-4xl text-gray-700 dark:text-gray-300">
                500 Credits
              </span>

            </div>


            <Button className="mt-8 w-full max-w-[20rem] py-3 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400">
              BUY FOR $45
            </Button>

          </Card>

        </div>
      </div>
    </div>
  )
}

export default Pricing