import { useStoreContext } from "../context/StoreContext";
import { Button } from "../ui/button"

function Navbar() {
    const {openDialogNewVehicle} = useStoreContext();

    return(
        <div className={`${openDialogNewVehicle && "bg-gray-300 transition-all"} h-16 py-4 px-10 flex justify-between items-center`}>
            <h1>Titolo</h1>
            <div className="flex gap-7">
                <h1>Home</h1>
                <h1>About</h1>
                <h1>Contact</h1>
            </div>
            <Button>Login</Button>
        </div>
    )
}

export default Navbar