import { Link } from "react-router-dom"

function Footer() {
    return (
        <div className="w-full bg-black text-white space-x-4 py-3 text-center">
            <h1>Footer -----------------</h1>
            <Link to="/testominal" >Testominal</Link>
            <Link to="/" >Home</Link>
        </div>
    )
}

export default Footer