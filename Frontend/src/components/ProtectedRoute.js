import { useContext } from "react"
import { UserContext } from "./Context/UserContext"
import { useHistory } from 'react-router-dom';

function ProtectedRoute(){

    const history = useHistory();    
    const {userInfo} = useContext(UserContext)

    if(userInfo){
        alert('Raam')
        return null;
    }

    return(
        'sdds'
    )
}

export default ProtectedRoute;