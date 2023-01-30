import { gql } from "@apollo/client";

//This gets the information of "Tests" from the backend
export const QueryProvas = gql`
  query Provas {
    provas {
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
          pdf {
            data {
              attributes {
                name
                hash
                ext
                mime
                url
              }
            }
          }
        }
      }
    }
  }
`;
