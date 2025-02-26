import Navbar from "@/components/ui/navbar";
import {
  Card
} from "@/components/ui/shadcnComponent/card"
import { Button } from "@/components/ui/shadcnComponent/button";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700'] });

const Pricing = async () => {

  

  return (
    <div className="flex flex-col h-screen">
      {/* <Sidebar session={session} /> */}
      <Navbar/>
      <div className="flex flex-col flex-1 px-4">
        <span className={`text-6xl h-[18vh] tracking-widest flex items-center justify-center ${orbitron.className}`}>
          Pricing
        </span>
        {/* <Separator/> */}
        <div className="flex flex-1 pt-2 gap-12 justify-center">

          <Card className="h-[28rem] w-[24rem] shadow-xl flex flex-col items-center bg-back rounded-2xl p-6 border hover:scale-105 transition-transform duration-500">

            <span className="mt-4 text-4xl text-gray-800 dark:text-gray-100">Basic Pack</span>



            <img src='/images/coin2.png' alt="Pro Credits" className="mt-6 h-40 w-40 object-contain" />

            <div className="flex flex-col items-center mt-6">
              <span className="font-semibold text-4xl text-gray-700 dark:text-gray-300">
                100 Credits
              </span>

            </div>


            <Button className="mt-8 w-full max-w-[20rem] py-3 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400">
              BUY FOR ₹1050
            </Button>

          </Card>


          <Card className="h-[28rem] w-[24rem] shadow-xl flex flex-col items-center bg-back rounded-2xl p-6 border hover:scale-105 transition-transform duration-500">

          <span className="text-gray-800 dark:text-gray-100 mt-4 text-4xl">Pro Pack</span>

            <img src="/images/coin2.png" alt="Pro Credits" className="mt-6 h-40 w-40 object-contain" />

            <div className="flex flex-col items-center mt-6">
              <span className="font-semibold text-4xl text-gray-700 dark:text-gray-300">
                200 Credits
              </span>

            </div>


            <Button className="mt-8 w-full max-w-[20rem] py-3 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400">
              BUY FOR ₹1750
            </Button>

          </Card>



          <Card className="h-[28rem] w-[24rem] shadow-xl flex flex-col items-center bg-back rounded-2xl p-6 border hover:scale-105 transition-transform duration-500">

            <span className="mt-4 text-4xl text-gray-800 dark:text-gray-100">Premium Pack</span>



            <img src="/images/coin2.png" alt="Pro Credits" className="mt-6 h-40 w-40 object-contain" />

            <div className="flex flex-col items-center mt-6">
              <span className="font-semibold text-4xl text-gray-700 dark:text-gray-300">
                500 Credits
              </span>

            </div>


            <Button className="mt-8 w-full max-w-[20rem] py-3 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400">
              BUY FOR ₹4000
            </Button>

          </Card>

        </div>
      </div>
    </div>
  )
}

export default Pricing