import { gql } from "@apollo/client";

//This gets the information of a unique "Test" from the backend
export const QueryProvas = gql`
  query Prova($slug: String!) {
    provas(filters: { slug: { eq: $slug } }) {
      data {
        attributes {
          title
          slug
          Pergunta {
            id
            title
            description
            comentario
          }
          pdf {
            data {
              attributes {
                name
                url
                mime
              }
            }
          }
        }
      }
    }
  }
`;

//This gets the information of the slug "Tests" from the backend
export const SlugList = gql`
  query Prova {
    provas {
      data {
        attributes {
          slug
        }
      }
    }
  }
`;
