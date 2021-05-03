import { gql } from '@apollo/client'
export const ME_QUERY = gql`
query {
  user {
    _id
    name
    username
    type
    address
    email
    tel
  }
}
`
