import { gql } from '@apollo/client'

export const DELETE_PROMOTION_MUTATION = gql`
mutation ($id:MongoID){
  removePromotionById
  (filter:{
    _id:$id}){
    recordId
  }
}
`