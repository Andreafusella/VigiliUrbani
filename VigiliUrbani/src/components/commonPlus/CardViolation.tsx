import { Trash } from "lucide-react"
import { Button } from "../ui/button"
import { IVIolation } from "../interfaces/Violation"

function CardViolation({tipo, amount, plate, idViolation, date} : IVIolation) {
    return(
        <div className="mt-5 flex justify-center">
            <div className="bg-slate-200 p-5 rounded-xl flex gap-20 items-center text-lg font-medium">
                <h1>Id: {idViolation}</h1>
                <h1>Data: <span>{date.toString()}</span></h1>
                <h1>Tipo: {tipo}</h1>
                <h1>Prezzo: {amount} $</h1>
                <h1>Targa: {plate}</h1>
                <div className="flex gap-5 items-center">
                    <Button className="bg-blue-600 hover:bg-blue-800">Paga</Button>
                    <Button className="bg-red-600 hover:bg-red-800">
                        <Trash className="-ms-1 me-2 opacity-80" size={16} strokeWidth={2} aria-hidden="true" />
                        Elimina
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CardViolation