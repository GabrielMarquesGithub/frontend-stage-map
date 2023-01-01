import * as yup from "yup";

const schema = yup
  .object({
    title: yup
      .string()
      .max(20, "O titulo pode ter até 20 caracteres")
      .required("Deve existir um titulo"),
    prediction: yup
      .date()
      .typeError("Deve existir uma data de previsão")
      .min(new Date(), "A data de previsão não poder ser menor que a atual")
      .required("Deve existir uma data de previsão"),
    deadline: yup
      .date()
      .typeError("Deve existir uma data limite")
      .min(new Date(), "A data limite não pode ser menor que a atual")
      .required("Deve existir uma data limite"),
    created_at: yup.date(),
    updated_at: yup.date(),
    description: yup
      .string()
      .max(1000, "A descrição pode ter no máximo 1000 caracteres"),
    products: yup
      .string()
      .max(1000, "A descrição pode ter no máximo 1000 caracteres"),
    client: yup
      .object({
        name: yup
          .string()
          .max(100, "O Nome do Cliente pode ter no máximo 100 caracteres")
          .required("O Campo Nome não pode estar vazio"),
        fone: yup.string().required("O Campo telefone não pode estar vazio"),
        email: yup
          .string()
          .email("Formato de E-mail invalido")
          .required("O Campo E-mail não pode estar vazio"),
      })
      .required(),
  })
  .required();

export default schema;
