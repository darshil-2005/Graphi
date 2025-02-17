import { ThemeProvider } from "../components/themeProvider";
import { Roboto } from 'next/font/google';
import '../globals.css'
import { SessionProvider } from "next-auth/react";
import { Toaster } from 'sonner';

export const metadata = {
  title: "Graphi",
  description: "Graphi is a data visualizer tool that allows you to create graphs and charts from your data and export them as images, or embed them in your website.",
};

const roboto = Roboto({ subsets: ['cyrillic'], weight: ['400', '700'] });
// const inter = Inter({ subsets: ['latin'], weight: ['400', '700'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className='scrollbar-thin scrollbar-thumb-foreground scrollbar-track-background'>
      <body className={`${roboto.className} text-[16px] tracking-wider bg-background text-foreground `}>
        <Toaster richColors />
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
