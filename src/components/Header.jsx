import { Link } from "react-router-dom"

function Header() {
  return (
    <div className="w-full bg-black text-white space-x-4 py-3 text-center">
      <Link to="/" >Home</Link>
      <Link to="/testominal" >Testominal</Link>
      <Link to="/about" >About</Link> {/* I know That Good Design means Good Bussiness */}
      
    </div>
  )
}

export default Header