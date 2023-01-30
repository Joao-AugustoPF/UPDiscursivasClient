import { gql } from "@apollo/client";

//This gets the information of "Questions" from the backend
export const QueryQuestões = gql`
  query Questoes {
    questoes {
      data {
        id
        attributes {
          title
          banca
          orgao
          disciplina
          cargo
          ano
          slug
        }
      }
    }
  }
`;
