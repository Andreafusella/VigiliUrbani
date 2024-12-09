import { Children, createContext, Dispatch, ReactNode, SetStateAction, useContext, useState, useEffect } from "react";
import { IVehicle } from "../interfaces/Vehicle";
import { IVIolation } from "../interfaces/Violation";


interface IStoreContextProps {
    vehicle: IVehicle[];
    setVehicle: Dispatch<SetStateAction<IVehicle[]>>;
    violation: IVIolation[];
    setViolation: Dispatch<SetStateAction<IVIolation[]>>;
    openDialogNewVehicle: boolean;
    setOpenDialogNewVehicle: Dispatch<SetStateAction<boolean>>;
    buttonOffSubmit: boolean;
    openDialogDeleteConfirm: boolean;
    openDialogNewViolation: boolean;
    openDialogNewViolationConfirm: boolean;

    handleVehicleAdd: (newVehicle: IVehicle) => void
    handleOpenDialogNewVehicle: () => void
    handleCloseDialogNewVehicle: () => void
    handleOpenDialogNewViolation: () => void
    handleVehicleDelete: (plate: IVehicle["plate"]) => void
    handleViolationDelete: (idViolation: IVIolation["idViolation"]) => void
    handleViolationAdd: (newViolation: IVIolation) => void
    handleOpenDialogNewViolationConfirm: () => void
}

const StoreContext = createContext<IStoreContextProps | null>(null);

const initialStoreContextState = {vehicle: []}

export const StoreProvider = ({children} : {children: ReactNode}) => {

    const [vehicle, setVehicle] = useState<IVehicle[]>([]);
    const [openDialogNewVehicle, setOpenDialogNewVehicle] = useState(false)
    const [violation, setViolation] = useState<IVIolation[]>([])
    const [buttonOffSubmit, setButtonOffSubmit] = useState(false);
    const [openDialogDeleteConfirm, setOpenDialogDeleteConfirm] = useState(false)
    const [openDialogNewViolationConfirm, setOpenDialogNewViolationConfirm] = useState(false)
    const [openDialogNewViolation, setOpenDialogNewViolation] = useState(false)

    function handleOpenDialogNewVehicle() {
        setOpenDialogNewVehicle(true);
    }

    function handleCloseDialogNewVehicle() {
        setOpenDialogNewVehicle(false);
    }

    function handleOpenDialogNewViolation() {
        setOpenDialogNewViolation(!openDialogNewViolation);
    }

    function handleCloseDialogNewViolation() {
        setOpenDialogNewViolation(false);
    }

    async function handleViolationDelete(idViolation: IVIolation["idViolation"]) {
        
        setButtonOffSubmit(true);
        const isConfirmed = window.confirm(`Vuoi eliminare la violazione N ${idViolation} ?`)

        if (!isConfirmed) {
            setButtonOffSubmit(false);
            return;
        } 
            

        const res = await fetch("http://localhost:8000/api/v1/violation", {
            method: "DELETE",
            headers: {
                "ContentType": "application/json"
            },
            body: JSON.stringify({
                idViolation
            })
        })

        const data : IVIolation = await res.json();

        setViolation((prevViolation) => prevViolation.filter((v) => v.idViolation != data.idViolation))
        setButtonOffSubmit(false);
        setOpenDialogDeleteConfirm(true);
        
        setTimeout(() => (
            setOpenDialogDeleteConfirm(false)
        ), 2000)
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

    function handleOpenDialogNewViolationConfirm() {
        setOpenDialogNewViolationConfirm(true);

        setTimeout(() => (
            setOpenDialogNewViolationConfirm(false)
        ), 2000)
    }

    function handleVehicleAdd(newVehicle: IVehicle) {
        setVehicle((prevVehicle) => [newVehicle, ...prevVehicle]);
    }
    function handleViolationAdd(newViolation: IVIolation) {
        setViolation((prevViolation) => [newViolation, ...prevViolation]);
    }



    return <StoreContext.Provider value={{
        vehicle, 
        setVehicle,
        violation,
        setViolation,
        openDialogNewVehicle,
        setOpenDialogNewVehicle,
        buttonOffSubmit,
        openDialogDeleteConfirm,
        openDialogNewViolation,
        openDialogNewViolationConfirm,

        handleVehicleDelete,
        handleOpenDialogNewVehicle,
        handleCloseDialogNewVehicle,
        handleVehicleAdd,
        handleViolationDelete,
        handleOpenDialogNewViolation,
        handleViolationAdd,
        handleOpenDialogNewViolationConfirm
    }}>{children}</StoreContext.Provider>
}

export const useStoreContext = () => {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error("useStoreContext must be used inside StoreProvider");
    }
    return context
}