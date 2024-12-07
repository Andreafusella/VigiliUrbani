import { useStoreContext } from "../context/StoreContext";

function DeleteDialogConfirm() {

    const { openDialogDeleteConfirm } = useStoreContext();
    return(
        <dialog className="modal" open={openDialogDeleteConfirm}>
            <div className="modal-box flex flex-col gap-4 bg-slate-100 items-center w-[300px]">
                <img src="../../../public/imgSvg/confirm.svg" alt="" className="size-20 mt-5"/>
                <h1 className="font-bold text-xl text-black ">Eliminato correttamente</h1>
            </div>
        </dialog>
    )
}

export default DeleteDialogConfirm