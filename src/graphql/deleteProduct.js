import { gql } from '@apollo/client'

export const DELETE_PRODUCT_MUTATION = gql`
mutation ($id: MongoID!){
  removeProductById(filter: {
  _id: $id}){
    recordId
  }
}
`