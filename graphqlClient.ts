import { GraphQLClient } from 'graphql-request'

const url = 'https://monteforteirpino.stepzen.net/api/melting-platypus/__graphql'
const apikey = process.env.EXPO_PUBLIC_GRAPHQL_API_KEY

const client = new GraphQLClient(url, {
    headers:{
        Authorization: "apikey monteforteirpino::stepzen.io+1000::2fef339e504f29f6e2e06fc6e8b85050cbfa14b411567de3edd31bc848235500"
    }
})

export default client