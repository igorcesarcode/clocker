import { Container } from "@chakra-ui/layout"
import { Spinner } from "@chakra-ui/spinner"
import { useState , useEffect } from "react"
import { Login , Agenda} from "../componests"
import firebase from "../config/firebase"

export default function Home() {

  const [auth, setAuth] = useState({
    loading:true,
    user: false
  })
  
  useEffect(()=>{
    firebase.auth().onAuthStateChanged(user =>{
      setAuth({
        loading:false,
        user
      })
    } )
  },[])
  
  if(auth.loading){
    return (
      <Container p={4} centerContent>
        <Spinner/>
      </Container>
    )
  }
  console.log(auth)
  return auth.user ? <Agenda/> : <Login/>
} 