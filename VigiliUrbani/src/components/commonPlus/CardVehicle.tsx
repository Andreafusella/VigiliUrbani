import { Link } from "react-router-dom"
import { useStoreContext } from "../context/StoreContext"
import { IVehicle } from "../interfaces/Vehicle"
import { Button } from "../ui/button"
import { Trash } from "lucide-react"

function CardVehicle({ plate, model, brand}: IVehicle) {

    const {handleVehicleDelete, openDialogNewVehicle, buttonOffSubmit} = useStoreContext()

    return(
        <div className={`border-[1px] ${openDialogNewVehicle ? "border-gray-300" : ""} border-gray-200 p-5 rounded-xl shadow-xl`}>
            <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-10">
                <img src="../../../imgVeicoli/auto.png" className="w-[100px] h-auto" />
                <div className="text-center w-full md:w-[250px]">
                    <h1 className="text-xl md:text-2xl font-semibold mt-2">Targa: <span className="text-lg">{plate}</span></h1>
                    <h1 className="text-base md:text-lg font-medium mt-3">Model: <span className="text-balance">{model}</span></h1>
                    <h1 className="text-base md:text-lg font-medium">Brand: <span className="text-base">{brand}</span></h1>
                </div>
                <div className="flex flex-col md:flex-row gap-5">
                    <Link to={`violation?plate=${plate}&model=${model}&brand=${brand}`}><Button className="bg-blue-700 hover:bg-blue-900 w-full md:w-auto">Violazioni</Button></Link>
                    <Button disabled={buttonOffSubmit} type="button" className="bg-red-500 hover:bg-red-700 w-full md:w-auto" onClick={() => handleVehicleDelete(plate)}>
                        <Trash className="-ms-1 me-2 opacity-80" size={16} strokeWidth={2} aria-hidden="true" />
                        Elimina
                    </Button>
                </div>
            </div>
        </div>
        
    )
}

export default CardVehicle