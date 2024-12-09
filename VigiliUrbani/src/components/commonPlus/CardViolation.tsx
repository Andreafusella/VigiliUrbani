import { Trash } from "lucide-react"
import { Button } from "../ui/button"
import { IVIolation } from "../interfaces/Violation"
import { useStoreContext } from "../context/StoreContext"
import DeleteDialogConfirm from "../common/DeleteDialogConfirm";

function CardViolation({tipo, amount, plate, idViolation, data} : IVIolation) {
    const { handleViolationDelete, buttonOffSubmit} = useStoreContext();
    console.log();
    
    return(
        <>
            <div className="mt-5 flex justify-center">
                <div className="border-gray-200 border-[1px] shadow-lg p-5 rounded-xl flex flex-col md:flex-row gap-5 md:gap-20 items-center text-lg font-medium">
                    <h1 className="text-center md:text-left">Id: {idViolation}</h1>
                    <h1 className="text-center md:text-left">Data: <span>{data.toString()}</span></h1>
                    <h1 className="text-center md:text-left">Tipo: {tipo}</h1>
                    <h1 className="text-center md:text-left">Prezzo: {amount} $</h1>
                    <h1 className="text-center md:text-left">Targa: {plate}</h1>
                    <div className="flex flex-col md:flex-row gap-5 items-center">
                        <Button className="bg-blue-600 hover:bg-blue-800 w-full md:w-auto">Paga</Button>
                        <Button disabled={buttonOffSubmit} className="bg-red-600 hover:bg-red-800 w-full md:w-auto" onClick={() => handleViolationDelete(idViolation)}>
                            <Trash className="-ms-1 me-2 opacity-80" size={16} strokeWidth={2} aria-hidden="true" />
                            Elimina
                        </Button>
                    </div>
                </div>
            </div>
            <DeleteDialogConfirm/>
        </>
    )
}

export default CardViolation