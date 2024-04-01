import { ActivityIndicator, StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { gql } from 'graphql-request'
import { useQuery } from '@tanstack/react-query'
import client from '@/graphqlClient'
import SetListItem from './SetListItem'

// a POST request of our reps and weight, fetched from mongodb, into stpezen down to our frontend
const setsQuery = gql`
    query exercises {
        sets {
        documents {
            _id
            exercise
            reps
            weight
        }
        }
    }
`

const SetsList = () => {
    // Queries the data from the stepzen using react query
    const {data, isLoading, error} = useQuery({
        queryKey:['sets'],
        queryFn: async ()=> client.request(setsQuery)
    })

    if(isLoading){
        return <ActivityIndicator />
    }

    console.log(data)

  return (
      <FlatList
        data={data.sets.documents}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <SetListItem set={item} />}
      />

  )
}

export default SetsList

const styles = StyleSheet.create({})