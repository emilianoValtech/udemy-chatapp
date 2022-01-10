import { useContext } from "react";
import Navbar from "./Components/Navbar";
import Chat from './Components/Chat'
import { ChatContext } from "./Context/ChatProvider";



function App() {

  const {usuario} = useContext(ChatContext)

  return usuario !== null?(
    <div >
      <Navbar/>
      {
        usuario.estado ? (
           <Chat/>
        ) : (
          <div className="lead text-center mt-5">Debes iniciar sesion</div>
        )
      }

    </div>
  ) : (
    <div>Loading...</div>
  )
}

export default App;
