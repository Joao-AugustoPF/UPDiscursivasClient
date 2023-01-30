import { gql } from "@apollo/client";

//Gets the information from user logged
export const QUERY_PROFILE_ME = gql`
  query QueryProfileMe {
    me {
      username
      email
    }
  }
`;
