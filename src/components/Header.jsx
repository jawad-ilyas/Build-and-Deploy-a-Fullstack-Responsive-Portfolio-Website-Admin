import { Link } from "react-router-dom"

function Header() {
  return (
    <div className="w-full bg-black text-white space-x-4 py-3 text-center">
      <Link to="/" >Home</Link>
      <Link to="/testominal" >Testominal</Link>
      <Link to="/about" >About</Link>
      <Link to="/work" >Work</Link>
      <Link to="/skill" >Skill</Link>

    </div>
  )
}

export default Header