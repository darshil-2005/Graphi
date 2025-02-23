import { Plus, Coins } from "lucide-react";
import { Button } from "@/components/ui/shadcnComponent/button";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function CreditsDisplay({ credits, onAddCredits, width }) {
    return (
        <a href='/pricing'>
        <button className={`flex h-[2.5rem] w-${width} items-center justify-between px-3 space-x-4 border border-muted-foreground/30 rounded-full bg-secondary/80 hover:bg-secondary hover:shadow-[0_0_3px_#0000ff] transition-all duration-500`}>
            
            <span className="flex items-center gap-x-0.5 text-foreground">
                <span className="text-lg">{`${credits ? credits : '...'}`}</span>
                <img src="/coin.png" alt="" className="size-6"/>
                {/* <Coins className="text-yellow-500 w-5 h-5" /> */}
            </span>

            {/* Plus Icon */}
            <span className=" text-forground rounded-full">
                <Plus className="w-5 h-5" />
            </span>

        </button>
        </a>
    );
}
