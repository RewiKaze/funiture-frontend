import { gql } from '@apollo/client'

export const DELETE_ORDER_MUTATION = gql`
mutation ($id: MongoID!){
  removeOrderById(filter: {
  _id: $id}){
    recordId
  }
}
`