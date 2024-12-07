import {Input} from "../ui/input"
import { useStoreContext } from "../context/StoreContext"
import { ComponentProps } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { IVehicle } from "../interfaces/Vehicle";

interface INewVehicleDialog extends ComponentProps<"dialog"> {}

const RegisterSchema = z.object({
    plate: z.string().min(6, "La targa deve almeno essere di 6 caratteri"),
    model: z.string().min(1, "Il modello deve essere inserito"),
    brand: z.string().min(2, "Il brand deve avere almeno 2 caratteri"),
})

type RegisterFormData = z.infer<typeof RegisterSchema>

function newVehicleDialog({className, ...props} : INewVehicleDialog) {

    const {openDialogNewVehicle, handleCloseDialogNewVehicle, setVehicle, handleVehicleAdd} = useStoreContext();

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<RegisterFormData>({
        resolver: zodResolver(RegisterSchema),
        mode: 'onSubmit'
    })

    const submiHandler: SubmitHandler<RegisterFormData> = (data) => {
        newVehicle();
        async function newVehicle() {
            const res = await fetch("http://localhost:8000/api/v1/vehicle", {
                method: "POST",
                headers: {
                    "Content-type" : "application/json"
                },
                body: JSON.stringify({
                    plate: data.plate,
                    model: data.model,
                    brand: data.brand
                })
            })

            const { plate }: {plate: IVehicle["plate"]} = await res.json();
            handleVehicleAdd({
                ...data,
                plate,
            });
            handleCloseDialogNewVehicle()
        }
    }

    return(
        <dialog open={openDialogNewVehicle} className="modal" {...props}>
            <div className="modal-box flex flex-col gap-4 bg-slate-100">
                <h1 className="font-bold text-xl text-black">New Vehicle</h1>
                <form id="registerForm" className="flex flex-col gap-3" onSubmit={handleSubmit(submiHandler)}>
                    <h1 className="text-lg">Plate</h1>
                    <Input
                        {...register("plate", {required: true})}
                        id="plateValue"
                        name="plate"
                        placeholder="XX123BC"
                        type="text"
                        className="h-12"    
                    />
                    {errors.plate && <span className="text-red-500">{errors.plate.message}</span>}

                    <h1 className="text-lg">Model</h1>
                    <Input
                        {...register("model", {required: true})}
                        id="modelValue"
                        name="model"
                        placeholder="M8 Cs"
                        type="text"
                        className="h-12"    
                    />
                    {errors.model && <span className="text-red-500">{errors.model.message}</span>}

                    <h1 className="text-lg">Brand</h1>
                    <Input
                        {...register("brand", {required: true})}
                        id="brandValue"
                        name="brand"
                        placeholder="Mercedes"
                        type="text"
                        className="h-12"    
                    />
                    {errors.brand && <span className="text-red-500">{errors.brand.message}</span>}
                    
                    <div className="modal-action">
                        <button onClick={handleCloseDialogNewVehicle} className="btn bg-gray-200" type="button">Chiudi</button>
                        <button disabled={isSubmitting} type="submit" className="btn btn-primary text-white">Create</button>
                    </div>
                
                </form>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={handleCloseDialogNewVehicle}>close</button>
            </form>
        </dialog>
    )
}

export default newVehicleDialog