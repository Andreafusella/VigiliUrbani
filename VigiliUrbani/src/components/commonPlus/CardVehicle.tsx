import { Link } from "react-router-dom"
import { useStoreContext } from "../context/StoreContext"
import { IVehicle } from "../interfaces/Vehicle"
import { Button } from "../ui/button"
import { Trash } from "lucide-react"

function CardVehicle({ plate, model, brand}: IVehicle) {

    const {handleVehicleDelete, openDialogNewVehicle} = useStoreContext()

    return(
        <div className={`border-[1px] ${openDialogNewVehicle ? "border-gray-300" : ""} border-gray-200 p-5 rounded-xl shadow-xl`}>
            <div className="flex justify-center items-center gap-10">
                <img src="../../../imgVeicoli/auto.png" className="size-[100px]" />
                <div className="text-center w-[250px]">
                    <h1 className="text-2xl font-semibold mt-2">Targa: <span className="text-lg">{plate}</span></h1>
                    <h1 className="text-lg font-medium mt-3">Model: <span className="text-balance">{model}</span></h1>
                    <h1 className="text-lg font-medium">Brand: <span className="text-base">{brand}</span></h1>
                </div>
                <div className="flex gap-5">
                    <Link to={`violation?plate=${plate}&model=${model}&brand=${brand}`}><Button className="bg-blue-700 hover:bg-blue-900">Violazioni</Button></Link>
                    <Button type="button" className="bg-red-500 hover:bg-red-700" onClick={() => handleVehicleDelete(plate)}>
                        <Trash className="-ms-1 me-2 opacity-80" size={16} strokeWidth={2} aria-hidden="true" />
                        Elimina
                    </Button>
                </div>
            </div>
        </div>
        
    )
}

export default CardVehicle