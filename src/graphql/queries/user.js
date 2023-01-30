import { gql } from "@apollo/client";

//Get the user information based on "BillingID" that is created when a User makes Register
export const QueryUser = gql`
  query QueryFindUserByBillingID($billing: String!) {
    usersPermissionsUsers(filters: { billingID: { eq: $billing } }) {
      data {
        id
        attributes {
          username
          plan
          billingID
          photo {
            data {
              id
              attributes {
                name
                url
              }
            }
          }
        }
      }
    }
  }
`;

//Get all the users information
export const QueryUsers = gql`
  query QueryFindUsers {
    usersPermissionsUsers {
      data {
        id
        attributes {
          username
          plan
          billingID
        }
      }
    }
  }
`;
