import Footer from "@/components/custom/Footer"
import { Outlet } from "react-router"
import { userContext } from "@/context/userContext"
import { useState } from "react"
import { type User } from "@/mocks/UserMock"


const HomeLayout = () => {
  const [users, setUsers] = useState<User[]>([])
  const [update, setUpdate] = useState<boolean>(true)

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex justify-center flex-1">
        <userContext.Provider value={{ users, setUsers, update, setUpdate }}>
          <Outlet />
        </userContext.Provider>
      </div>
      <div className="flex justify-center">
        <Footer />
      </div>
    </div>
  )
}

export default HomeLayout