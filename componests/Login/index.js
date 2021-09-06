import { useFormik } from "formik";
import * as yup from "yup";
import Link from "next/link";
import { Logo } from "../Logo";
import firebase, { persistenceMode } from "../../config/firebase";

import {
  Container,
  Box,
  Input,
  Button,
  Text,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/react";


const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("E-mail invalido")
    .required("Preenchimento obrigatório"),
  password: yup.string().required("Preenchimento obrigatório"),
});

export const Login = () => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    onSubmit: async (values, form) => {
      firebase.auth().setPersistence(persistenceMode);
      try {
        const user = await firebase
          .auth()
          .signInWithEmailAndPassword(values.email, values.password);
        console.log(user);
      } catch (error) {
        console.log(error);
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
              {" "}
              {errors.email}{" "}
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
              {" "}
              {errors.password}{" "}
            </FormHelperText>
          )}
        </FormControl>

        <Box p={4}>
          <Button
            width="100%"
            onClick={handleSubmit}
            colorScheme="blue"
            isLoading={isSubmitting}
          >
            {" "}
            Entra
          </Button>
        </Box>
      </Box>

      <Link href="/signup">Ainda não tem uma conta? Cadastrasse</Link>
    </Container>
  );
};
