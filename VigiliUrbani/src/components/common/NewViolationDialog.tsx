import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import { useStoreContext } from "../context/StoreContext";
import { useState } from "react";

const RegisterSchema = z.object({
    data: z.string().min(1, "La data deve essere inserita"),
    tipo: z.string().min(1, "Il tipo deve essere inserito"),
    amount: z.string().min(1, "Il prezzo deve essere inserito"),
    plate: z.string().min(6, "La targa deve avere minimo 6 caratteri")
})

type RegisterFormData = z.infer<typeof RegisterSchema>

function newViolationDialog() {

    const {handleOpenDialogNewViolation, openDialogNewViolation, handleOpenDialogNewViolationConfirm} = useStoreContext()
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [notFoundPlateMessage, setNotFoundPlateMessage] = useState(false);
    

    const {register, handleSubmit, formState: {errors}, reset} = useForm<RegisterFormData>({
        resolver: zodResolver(RegisterSchema),
    })

    const submiHandler: SubmitHandler<RegisterFormData> = async (data) => {
        setIsSubmitting(true);

        const amountWithDot = data.amount.replace(',', '.');
        const updateAmount = parseFloat(amountWithDot);
        const date = new Date(data.data);
        const formattedDate = date.toISOString().split("T")[0];

        await newViolation();
        console.log(isSubmitting);

        async function newViolation() {
            const res = await fetch("http://localhost:8000/api/v1/violation", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    data: formattedDate,
                    tipo: data.tipo,
                    amount: updateAmount,
                    plate: data.plate
                })
            });
            if (res.status == 404) {
                setNotFoundPlateMessage(true);
            } else {
                handleOpenDialogNewViolation();
                reset()
                handleOpenDialogNewViolationConfirm()
            }
        }

        setIsSubmitting(false);
    }

    return(
        <dialog open={openDialogNewViolation} className="modal">
            <div className="modal-box flex flex-col gap-4 bg-slate-100">
                <h1 className="font-bold text-xl text-black">New Vehicle</h1>
                <form id="registerForm" className="flex flex-col gap-3" onSubmit={handleSubmit(submiHandler)}>
                    <h1 className="text-lg">Data</h1>
                    <Input
                        {...register("data", {required: true})}
                        id="dataValue"
                        name="data"
                        placeholder="01/01/1900"
                        type="date"
                        className="h-12"    
                    />
                    {errors.data && <span className="text-red-500">{errors.data.message}</span>}

                    <h1 className="text-lg">Tipo</h1>
                    <Input
                        {...register("tipo", {required: true})}
                        id="tipoValue"
                        name="tipo"
                        placeholder="Velocità"
                        type="text"
                        className="h-12"    
                    />
                    {errors.tipo && <span className="text-red-500">{errors.tipo.message}</span>}

                    <h1 className="text-lg">Prezzo</h1>
                    <Input
                        {...register("amount", {required: true})}
                        id="amountValue"
                        name="amount"
                        placeholder="30 $"
                        type="text"
                        className="h-12"    
                    />
                    {errors.amount && <span className="text-red-500">{errors.amount.message}</span>}

                    <h1 className="text-lg">Targa</h1>
                    <Input
                        {...register("plate", {required: true})}
                        id="plateValue"
                        name="plate"
                        placeholder="XX124XX"
                        type="text"
                        className="h-12"    
                    />
                    {errors.plate && <span className="text-red-500">{errors.plate.message}</span>}
                    {notFoundPlateMessage && <span className="text-red-500">La targa non esiste</span>}
                    
                    <div className="modal-action">
                        <button onClick={handleOpenDialogNewViolation} className="btn bg-gray-200" type="button">Chiudi</button>
                        <button disabled={isSubmitting} type="submit" className="btn btn-primary text-white">
                            {isSubmitting ? (
                                <div className="flex items-center">
                                    <img src="../../../public/imgSvg/loading.svg" alt="Caricamento..." className="size-5 mr-2"/>
                                    <span>Caricamento...</span>
                                </div>
                            ) : (
                                <h1>Crea</h1>
                            )}
                        </button>
                    </div>
                
                </form>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={handleOpenDialogNewViolation}>close</button>
            </form>
        </dialog>
    )
}

export default newViolationDialog