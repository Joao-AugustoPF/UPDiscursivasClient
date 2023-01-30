import { gql } from "@apollo/client";

//This is used to set the user plan
export const MutationSettingPlan = gql`
  mutation MutationRegisterPlan($id: ID!, $data: UsersPermissionsUserInput!) {
    updateUsersPermissionsUser(id: $id, data: $data) {
      data {
        id
        attributes {
          username
          hasTrial
          plan
          endDate
        }
      }
    }
  }
`;

export const MutationRegisterBilling = gql`
  mutation MutationRegisterId($id: ID!, $data: UsersPermissionsUserInput!) {
    updateUsersPermissionsUser(id: $id, data: $data) {
      data {
        id
        attributes {
          username
          billingID
        }
      }
    }
  }
`;

export const MutationRegisterTrial = gql`
  mutation MutationRegisterPlans($id: ID!, $data: UsersPermissionsUserInput!) {
    updateUsersPermissionsUser(id: $id, data: $data) {
      data {
        id
        attributes {
          username
          hasTrial
        }
      }
    }
  }
`;

export const MutationRegisterMensal = gql`
  mutation MutationRegisterPlanMensal(
    $id: ID!
    $data: UsersPermissionsUserInput!
  ) {
    updateUsersPermissionsUser(id: $id, data: $data) {
      data {
        id
        attributes {
          username
          plan
        }
      }
    }
  }
`;

export const MutationRegisterEndDate = gql`
  mutation MutationRegisterEndDate(
    $id: ID!
    $data: UsersPermissionsUserInput!
  ) {
    updateUsersPermissionsUser(id: $id, data: $data) {
      data {
        id
        attributes {
          username
          endDate
        }
      }
    }
  }
`;
