import { gql } from "@apollo/client";

//It gets the mutation "UpdateUserRole" from GraphQL in backend Strapi that is used to set the roles to the user when a payment is made and got success

export const MutationMensal = gql`
  mutation UpdateUserRole($id: ID!, $data: UsersPermissionsUserInput!) {
    updateUsersPermissionsUser(id: $id, data: $data) {
      data {
        attributes {
          username
          role {
            data {
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;
