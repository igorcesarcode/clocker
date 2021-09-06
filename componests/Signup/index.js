import { useFormik } from "formik";
import * as yup from "yup";
import Link from 'next/link'
import { Logo } from "../Logo";
import firebase from "../../config/firebase";

import {
  Container,
  Box,
  Input,
  Button,
  Text,
  FormControl,
  FormLabel,
  FormHelperText,
  InputLeftAddon,
  InputGroup,
} from "@chakra-ui/react";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("E-mail invalido")
    .required("Preenchimento obrigatório"),
  password: yup.string().required("Preenchimento obrigatório"),
  username: yup.string().required("Preenchimento obrigatório"),
});

export const Signup = () => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } =
    useFormik({
      onSubmit: async (values, form) => {
        try {
          const user = await firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
          console.log(user)
        } catch (error) {

          console.log(error)
        }

      },
      validationSchema,
      initialValues: {
        email: "",
        username: "",
        password: "",
      },
    });
  return (
    <Container p={4} centerContent>
      <Logo />
      <Box p={4} mt={8}>
        <Text>Cria sua agenda compartilhanda</Text>
      </Box>

      <Box>
        <FormControl id="email" p={4} isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && (
            <FormHelperText textColor="#e74c3c">

              {errors.email}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl id="password" p={4} isRequired>
          <FormLabel>Senha</FormLabel>
          <Input
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.password && (
            <FormHelperText textColor="#e74c3c">

              {errors.password}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl id="username" p={4} isRequired>
          <InputGroup>
            <InputLeftAddon children="clocker.io/" />
            <Input
              type="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            
          </InputGroup>
          {touched.username && (
            <FormHelperText textColor="#e74c3c">
              {errors.username}
            </FormHelperText>
          )}
        </FormControl>

        <Box p={4}>
          <Button width="100%"
            onClick={handleSubmit} colorScheme="blue" isLoading={isSubmitting} > Cadastra</Button>
        </Box>
      </Box>
      <Link href='/'>Já tem uma conta Acesse</Link>

    </Container>
  );
}
