import { gql } from "@apollo/client";

//This gets the information of a unique "Question" from the backend
export const QueryQuestão = gql`
  query Questao($slug: String!) {
    questoes(filters: { slug: { eq: $slug } }) {
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

//This gets the information of the slug "Questions" from the backend
export const SlugList = gql`
  query Questao {
    questoes {
      data {
        attributes {
          slug
        }
      }
    }
  }
`;
