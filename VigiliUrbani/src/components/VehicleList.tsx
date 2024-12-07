import { Fragment, useEffect, useState } from "react"
import CardVehicle from "./commonPlus/CardVehicle"
import { useStoreContext } from "./context/StoreContext"
import { Button } from "./ui/button"
import RegisterDialog from "./common/RegisterDialog"
import { Input } from "./ui/input"
import { z } from "zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { IVehicle } from "./interfaces/Vehicle"
import { MoveLeft } from "lucide-react"

const RegisterSchema = z.object({
    plate: z.string().min(7, "La targa deve avere minimo 7 caratteri")
})

type RegisterFormData = z.infer<typeof RegisterSchema>

function VehicleList() {

    const {vehicle, setVehicle, handleOpenDialogNewVehicle, openDialogNewVehicle} = useStoreContext();
    const [findVehicle, setFindVehicle] = useState(false);
    const [singleVehicle, setSingleVehicle] = useState<IVehicle>()
    const [errorNotFoundVehicle, setErrorNotFoundVehicle] = useState(false);

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<RegisterFormData>({
        resolver: zodResolver(RegisterSchema),
        mode: 'onSubmit'
    })

    const submitHandler: SubmitHandler<RegisterFormData> = (data) => {
        findVehicle();
        async function findVehicle() {
            const res = await fetch(`http://localhost:8000/api/v1/getVehicleByPlate?plate=${data.plate}`)
            const dataVehicle : IVehicle = await res.json();            
            if (res.status == 404) {
                setErrorNotFoundVehicle(true)
            } else {
                setFindVehicle(true);
                setSingleVehicle(dataVehicle);
                setErrorNotFoundVehicle(false)
            }
        }
    }

    useEffect( () => {
        fetch("http://localhost:8000/api/v1/vehicle")
            .then((response) => response.json())
            .then((vehicleData) => {
                setVehicle(vehicleData);
            })
            .catch((err) => {
                console.log(err);
            });
    },[])

    function renderList() {
        return vehicle.length > 0 ? (
            vehicle.map((v) => {
                return (
                    <Fragment key={v.plate}>
                        <CardVehicle plate={v.plate} brand={v.brand} model={v.model}></CardVehicle>
                    </Fragment>
                )
            })
        ) : (
            <p>No vehicle</p>
        )
    }
    return(
        <>
            <div className={`flex flex-col justify-center items-center ${openDialogNewVehicle && "bg-gray-300 transition-all"} mb-10`}>
                <div className="max-w-2xl w-full">
                    <form id="findForm" onSubmit={handleSubmit(submitHandler)}>
                        <div className="flex justify-center ">
                            <div className="flex w-full max-w-sm items-center space-x-2">
                                {findVehicle ? (
                                    <div className="flex items-center">
                                        <button onClick={() => setFindVehicle(false)}>
                                            <MoveLeft className="h-[30px] w-[40px]"/>
                                        </button>
                                    </div>
                                ) : (
                                    ""
                                )}
                                <Input {...register("plate")} id="plateValue" type="text" placeholder="XX124XX" className={`h-12 ${openDialogNewVehicle && "border-gray-300"}`}/>
                                <Button disabled={isSubmitting} type="submit" className="h-12">Cerca 🔎</Button>
                            </div>
                        </div>
                        <div className="flex justify-center mt-2">
                            {errors.plate && <span className="text-red-500">{errors.plate.message}</span>}
                        </div>
                        <div className="flex justify-center mt-2">
                            {errorNotFoundVehicle && <span className="text-red-500">Non è stato trovato alcun veicolo con quella targa</span>}
                        </div>
                    </form>
                    <div className="flex justify-between w-full items-center">
                        <h1 className="text-3xl my-10" style={{fontFamily: "Noto Sans Korean, sans-serif"}}>Lista Veicoli</h1>
                        <Button onClick={handleOpenDialogNewVehicle} className="bg-blue-600 hover:bg-blue-800">Add car +</Button>
                    </div>
                </div>
                <div className="space-y-5">
                    {findVehicle ? (
                        <CardVehicle plate={singleVehicle?.plate || ""} model={singleVehicle?.model || ""} brand={singleVehicle?.brand || ""} ></CardVehicle>
                    ) : (
                        renderList()
                    )}
                </div>
            </div>
            <RegisterDialog></RegisterDialog>
        </>

        
    )
}

export default VehicleList