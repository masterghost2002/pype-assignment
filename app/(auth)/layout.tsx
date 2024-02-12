import Header from '@/components/Header';
import { Toaster } from 'react-hot-toast';
export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <div
            className="
          flex 
          flex-col 
          min-h-screen
          font-ma
          relative
          dark:bg-dark-gray
          dark:text-white
        "
        >
            <Toaster />
            <main
                className="
          flex-grow 
          flex 
          flex-col 
          items-center 
          justify-center
          p-5
          "
                id="main-container"
            >
                {children}
            </main>
        </div>
    )
}

