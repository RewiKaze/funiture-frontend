import { gql } from "@apollo/client";

export const UPDATE_ORDER_MUTATION = gql`
  mutation($id: MongoID!, $record: UpdateByIdOrderInput!) {
    updateOrder(_id: $id, record: $record) {
      recordId
    }
  }
`;
