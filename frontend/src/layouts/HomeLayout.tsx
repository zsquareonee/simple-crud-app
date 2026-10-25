import Footer from "@/components/custom/Footer"
import ThemeToggle from "@/components/custom/ThemeToggle"
import { UsersIcon } from "lucide-react"
import { Outlet } from "react-router"

const HomeLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="border-b border-border sticky top-0 z-30 bg-background/80 backdrop-blur-sm">
        <div className="w-full max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-primary text-primary-foreground rounded-lg shadow-xs">
              <UsersIcon className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-semibold text-lg leading-tight">User Manager</h1>
              <p className="text-xs text-muted-foreground">FastAPI &amp; React CRUD</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6">
        <Outlet />
      </main>

      <div className="flex justify-center">
        <Footer />
      </div>
    </div>
  )
}

export default HomeLayout
