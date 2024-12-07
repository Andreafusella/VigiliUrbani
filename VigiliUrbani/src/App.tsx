import { Route, Routes } from "react-router-dom"
import VehicleList from "./components/VehicleList"
import { StoreProvider } from "./components/context/StoreContext"
import ViolationList from "./components/ViolationList"
import Layout from "./components/Layout"



function App() {
  return (
    <StoreProvider>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<VehicleList/>}></Route>
          <Route path="violation" element={<ViolationList/>}></Route>
        </Route>
        <Route path="*" element={<>Page not found!</>} />
      </Routes>
    </StoreProvider>
  )
}

export default App
