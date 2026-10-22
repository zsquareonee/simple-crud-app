import github_logo from "@/assets/github-logo.svg"
import linkedin_logo from "@/assets/linkedin-logo.svg"


const Footer = () => {
  return (
    <footer className="llcontainer flex h-10 py-1 gap-2 justify-end w-full">
      <a href="https://github.com/simple-crud-app" target="_blank">
        <img src={github_logo} alt="gihtub logo" className="h-full" />
      </a>
      <a href="https://www.linkedin.com/in/elias-meza-fernandez-0a160035b/" target="_blank">
        <img src={linkedin_logo} alt="linkedin logo" className="h-full " />
      </a>
    </footer>
  )
}

export default Footer