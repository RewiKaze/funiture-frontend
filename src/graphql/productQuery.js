import { gql } from '@apollo/client'
export const PRODUCT_QUERY = gql`
query{
  products (sort: _ID_DESC){
    _id
    name
    slug
    description
    type
    quantity
    price
    imageUrl
    timestamp
  }
}
`
export const PRODUCT_QUERY1 = gql`query($id: MongoID!) {
    productByID(_id: $id) {
     _id
    name
    slug
    description
    type
    quantity
    price
    imageUrl
    tags
    timestamp
    }
  }`
