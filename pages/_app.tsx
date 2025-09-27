import type { AppProps } from 'next/app'
import '@/styles/globals.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-indigo-600 text-white shadow">
        <div className="max-w-4xl mx-auto px-4 py-4 text-xl font-bold">
          Techcom Attendance
        </div>
      </header>
      <main className="flex-1 flex justify-center items-center px-4">
        <Component {...pageProps} />
      </main>
      <footer className="bg-gray-200 text-center text-sm py-2">
        &copy; {new Date().getFullYear()} Techcom
      </footer>
    </div>
  )
}
