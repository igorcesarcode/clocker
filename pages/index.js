import { Container } from "@chakra-ui/layout"
import { Spinner } from "@chakra-ui/spinner"
import { Login, Agenda, useAuth } from "../componests"


export default function Home() {
  const [auth] = useAuth()

  if (auth.loading) {
    return (
      <Container p={4} centerContent>
        <Spinner />
      </Container>
    )
  }
  console.log(auth)
  return auth.user ? <Agenda /> : <Login />
}