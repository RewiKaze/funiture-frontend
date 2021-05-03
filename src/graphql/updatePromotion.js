import { gql } from "@apollo/client";

export const UPDATE_PROMOTION_MUTATION = gql`
  mutation($id: MongoID!, $record: UpdateByIdPromotionInput!) {
    updatePromotionById(_id: $id, record: $record) {
      recordId
    }
  }
`;
