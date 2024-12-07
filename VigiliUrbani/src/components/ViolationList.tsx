import { useLocation } from "react-router-dom"
import CardViolation from "./commonPlus/CardViolation";
import { useStoreContext } from "./context/StoreContext";
import { Fragment, useEffect } from "react";

function ViolationList() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const plate = queryParams.get("plate")
    const model = queryParams.get("model")
    const brand = queryParams.get("brand")

    const {violation, setViolation} = useStoreContext();
    useEffect( () => {
        fetch(`http://localhost:8000/api/v1/violation?plate=${plate}`)
            .then((response) => response.json())
            .then((violationData) => {
                setViolation(violationData);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    function renderList() {
        return violation.length > 0 ? (
                violation.map((v) => {
                    return (
                        <Fragment key={v.idViolation}>
                            <CardViolation 
                                date={v.date}
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
            <div className="flex justify-center gap-10 p-4">
                <div className="flex gap-10 bg-slate-200 rounded-xl p-5 shadow-lg">
                    <img src="../../../imgVeicoli/auto.png" className="size-40" />
                    <div className="flex gap-5 items-center text-xl">
                        <h1>{plate}</h1>
                        <h1>{model}</h1>
                        <h1>{brand}</h1>
                    </div>
                </div>
            </div>
            <div className="space-y-5">
                <div>
                    
                </div>
                {renderList()}
            </div>
        </>
    )
}

export default ViolationList