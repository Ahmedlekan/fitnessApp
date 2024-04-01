import { ActivityIndicator, StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { gql } from 'graphql-request'
import { useQuery } from '@tanstack/react-query'
import client from '@/graphqlClient'
import SetListItem from './SetListItem'

// a POST request of our reps and weight, fetched from mongodb, into stpezen down to our frontend
const setsQuery = gql`
query MyQuery($exercise: String!) {
  sets(exercise:$exercise) {
    documents {
      _id
      exercise
      reps
      weight
    }
  }
}
`

const SetsList = ({ListHeaderComponent, exerciseName}:any) => {
    // Queries the data from the stepzen using react query
    const {data, isLoading, error} = useQuery({
        queryKey:['sets', exerciseName],
        queryFn: async ()=> client.request(setsQuery, {exercise: exerciseName})

        
    })

    if(isLoading){
        return <ActivityIndicator />
    }

    console.log(data)

  return (
      <FlatList
        data={data.sets.documents}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={()=> (
          <ListHeaderComponent />
        )}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <SetListItem set={item} />}
      />

  )
}

export default SetsList

const styles = StyleSheet.create({})