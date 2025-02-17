import { Orbitron } from 'next/font/google';
import { Button } from '@/components/ui/shadcnComponent/button';
import { ArrowRight } from 'lucide-react';
import '../globals.css';
import LineChartExample from '@/components/ui/heroSectionExamples/exLineChart';
import AreaChartExample from '@/components/ui/heroSectionExamples/exAreaChart';
import BarChartExample from '@/components/ui/heroSectionExamples/exBarChart';
import PieChartExample from '@/components/ui/heroSectionExamples/exPieChart';
import Link from 'next/link'
import Navbar from '@/components/ui/navbar'

import { auth } from '@/auth';

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700'] })

export default async function Default() {

  return (
    <div className='h-screen px-2 bg-[linear-gradient(to_right,#4f4f4f4e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f4e_1px,transparent_1px)] bg-[size:60px_60px] '>
      <Navbar/>

      <section className={`relative grid justify-center items-center gap-y-12 mt-[7%]  w-[70%] mx-auto p-8`}>
        <div className='grid gap-y-4 relative'>
          <div className=' before:absolute before:content-[""] before:top-1/2 before:-translate-y-1/2 before:left-1/2 before:-translate-x-1/2 before:bg-chart-1/40 before:h-full before:w-[110%] before:blur-[80px] before:rounded-full z-[5]'>
            <p className={`mx-auto text-center text-5xl font-semibold ${orbitron.className} tracking-widest`}>Create Graphs and Canvases in Minutes</p>
          </div>
          <div className='relative'>
            <p className='mx-auto text-center text-lg text-muted-foreground '>Create beautiful, interactive graphs in minutes and embed them seamlessly into your projects. No coding required—just drag, customize, and share!</p>
          </div>
        </div>
        <div className='mx-auto grid grid-cols-2 w-[50%]'>
          <Button variant='outline' className='w-44 mx-auto z-20'><Link href='/tutorial' className='flex items-center gap-x-2'>Tutorial<ArrowRight /></Link></Button>
          <Button className='w-44 mx-auto z-20'><Link href='/login'>Get Started</Link></Button>
        </div>

        <div className='h-[16rem] w-[30rem] blur-[1.5px] fixed top-28 left-10 hover:blur-0 z-0 hover:z-10'>
          <LineChartExample />
        </div>
        <div className='h-[16rem] w-[30rem] blur-[1.5px] fixed top-16 right-28 hover:blur-0 z-0 hover:z-10'>
          <AreaChartExample />
        </div>
        <div className='h-[16rem] w-[30rem] blur-[1.5px] fixed bottom-10 left-32 hover:blur-0 z-0 hover:z-10'>
          <BarChartExample />
        </div>
        <div className='h-[16rem] w-[30rem] blur-[1.5px] fixed bottom-16 right-28 hover:blur-0 z-0 hover:z-10'>
          <PieChartExample />
        </div>
      </section>


    </div>
  );
}