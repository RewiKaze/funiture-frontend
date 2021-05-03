import { gql } from "@apollo/client";

export const UPDATE_PRODUCT_MUTATION = gql`
  mutation($id: MongoID!, $record: UpdateByIdProductInput!) {
    updateProduct(_id: $id, record: $record) {
      recordId
    }
  }
`;
