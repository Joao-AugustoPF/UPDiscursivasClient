import { gql } from "@apollo/client";

//This is the mutation that registers a user in the backend Strapi

export const MutationRegister = gql`
  mutation MutationRegister($input: UsersPermissionsRegisterInput!) {
    register(input: $input) {
      jwt
      user {
        id
      }
    }
  }
`;
