import { useLocation } from "react-router-dom"
import CardViolation from "./commonPlus/CardViolation";
import { useStoreContext } from "./context/StoreContext";
import { Fragment, useEffect, useState } from "react";

function ViolationList() {

    const [loadingList, setLoadingList] = useState(false);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const plate = queryParams.get("plate")
    const model = queryParams.get("model")
    const brand = queryParams.get("brand")

    const {violation, setViolation} = useStoreContext();
    useEffect( () => {
        setLoadingList(true)
        fetch(`http://localhost:8000/api/v1/violation?plate=${plate}`)
            .then((response) => response.json())
            .then((violationData) => {
                setViolation(violationData);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoadingList(false)
            });
    }, [])

    function renderList() {
        return violation.length > 0 ? (
                violation.map((v) => {
                    return (
                        <Fragment key={v.idViolation}>
                            <CardViolation 
                                data={v.data}
                                tipo={v.tipo} 
                                amount={v.amount} 
                                plate={plate} 
                                idViolation={v.idViolation}
                            ></CardViolation>
                        </Fragment>
                    )
                })
        ) : (
            <p className="text-center text-2xl font-bold mt-10">Non sono presenti violazioni al momento</p>
        )
    }
    

    return(
        <>
            {loadingList ? (
                <div className="absolute inset-0 flex justify-center items-center">
                    <img src="../../public/imgSvg/loadingBlack.svg" alt="Caricamento..." className="size-20 mr-2"/>
                    <span className="text-2xl font-bold">Caricamento...</span>
                </div>
            ) : (
                <>
                    <div className="flex flex-col items-center gap-10 p-4">
                        <div className="flex flex-col justify-center md:flex-row gap-10  rounded-xl p-5 shadow-lg w-full md:max-w-2xl max-w-md">
                            <img src="../../../imgVeicoli/auto.png" className="md:size-40 size-24 md:m-0 m-auto md:w-auto" />
                            <div className="flex flex-col md:flex-row gap-5 items-center text-xl">
                                <h1 className="text-center md:text-left">{plate}</h1>
                                <h1 className="text-center md:text-left">{model}</h1>
                                <h1 className="text-center md:text-left">{brand}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-5">
                        {renderList()}
                    </div>
                </>
            )}
            
        </>
    )
}

export default ViolationList