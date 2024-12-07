import { Outlet } from "react-router-dom";
import Navbar from "./commonPlus/Navbar";

function Layout() {
    return(
        <div>
            <Navbar/>
            <Outlet/>
        </div>
    )
}

export default Layout