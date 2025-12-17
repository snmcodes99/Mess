import { useAuth} from "../../context/context_rout"

export const Login =()=>{
    const{isAuthenticated,setIsAuthenticated} = useAuth();
    const onlogClick=()=>{
        setIsAuthenticated(!isAuthenticated);
    }
    return(
        <>
        <h1>This is Login Page</h1>
        <button onClick={onlogClick}>Login</button>
        </>
    )
}