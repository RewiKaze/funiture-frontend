import { gql } from '@apollo/client'

export const DELETE_PRODUCT_MUTATION = gql`
mutation ($id: MongoID!){
    removeProductById(_id: $id) {
        record
        {
            _id
        }
    }
    } 
`