import type { Metadata } from "next";
import "./globals.css";
import { app_name } from "~/constants/app";
import Navbar from "~/components/Navbar";

export const metadata: Metadata = {
  title: app_name,
  description: app_name + " adalah website yang menyediakan detail dari Movie dan Tv Series yang populer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>

        <header>
            <Navbar />
        </header>

        <main
          className='min-h-screen sm:px-12 pt-16'
        >
          {children}
        </main>

        <footer
          className='mt-20 w-full flex justify-center p-2'
        >
          <h1
            className="text-center"
          >
            Copyright &copy; { new Date().getFullYear() } { app_name }.
          </h1>
        </footer>
        
      </body>
    </html>
  );
}
