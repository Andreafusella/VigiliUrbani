import { Children, createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { IVehicle } from "../interfaces/Vehicle";
import { IVIolation } from "../interfaces/Violation";

interface IStoreContextProps {
    vehicle: IVehicle[];
    setVehicle: Dispatch<SetStateAction<IVehicle[]>>;
    violation: IVIolation[];
    setViolation: Dispatch<SetStateAction<IVIolation[]>>;
    openDialogNewVehicle: boolean;
    setOpenDialogNewVehicle: Dispatch<SetStateAction<boolean>>;

    handleVehicleAdd: (newVehicle: IVehicle) => void
    handleOpenDialogNewVehicle: () => void
    handleCloseDialogNewVehicle: () => void
    handleVehicleDelete: (plate: IVehicle["plate"]) => void
}

const StoreContext = createContext<IStoreContextProps | null>(null);

const initialStoreContextState = {vehicle: []}

export const StoreProvider = ({children} : {children: ReactNode}) => {

    const [vehicle, setVehicle] = useState<IVehicle[]>([]);
    const [openDialogNewVehicle, setOpenDialogNewVehicle] = useState(false)
    const [violation, setViolation] = useState<IVIolation[]>([])

    function handleOpenDialogNewVehicle() {
        setOpenDialogNewVehicle(true);
    }

    function handleCloseDialogNewVehicle() {
        setOpenDialogNewVehicle(false);
    }

    async function handleVehicleDelete(plate: IVehicle["plate"]) {
        const isConfirmed = window.confirm(`Vuoi eliminare il veicolo con targa: ${plate} ?`)

        if (!isConfirmed) return;
        
        
        const res = await fetch("http://localhost:8000/api/v1/vehicle", {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({plate}) 
        })

        const data : IVehicle = await res.json();
        console.log(data);

        setVehicle((prevVehicle) => prevVehicle.filter((u) => u.plate != data.plate))
        
    }

    async function handleVehicleAdd(newVehicle: IVehicle) {
        setVehicle((prevVehicle) => [newVehicle, ...prevVehicle]);
    }

    return <StoreContext.Provider value={{
        vehicle, 
        setVehicle,
        violation,
        setViolation,
        openDialogNewVehicle,
        setOpenDialogNewVehicle, 
        handleVehicleDelete,
        handleOpenDialogNewVehicle,
        handleCloseDialogNewVehicle,
        handleVehicleAdd
    }}>{children}</StoreContext.Provider>
}

export const useStoreContext = () => {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error("useStoreContext must be used inside StoreProvider");
    }
    return context
}