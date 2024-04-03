import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import ExerciseListItem from '@/components/ExerciseListItem'
import { useQuery } from '@tanstack/react-query'
import { gql } from 'graphql-request'
// client to make a request from GraphClient
import client from '@/graphqlClient'
import NewSetInput from '@/components/NewSetInput'
import { useAuth } from '@/authContext/authContext'
import { Redirect } from 'expo-router'

// getting the query from ibm stepzen to the list the exercise
const exercisesQuery = gql`
query exercises($muscle: String, $name: String) {
  exercises(muscle: $muscle, name: $name) {
    name
    muscle
    equipment
  }
}
`;



const ExercisesScreen = () => {
  const {username} = useAuth()
  // Queries the data from the stepzen using react query 
  const {data, isLoading, error} = useQuery({
    queryKey:['exercises'],
    queryFn: async ()=> client.request(exercisesQuery)
  })

    if (isLoading){
      return (<ActivityIndicator />)
    }

    if(error){
      return <Text>Failed to fecth exercises</Text>
    }

    if (!username) {
      return <Redirect href={'/auth'} />;
    }

  return (
    <View>

      <FlatList
        data={data?.exercises}
        contentContainerStyle={{ gap: 5 }}
        style={{ padding: 10 }}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item }) => <ExerciseListItem item = {item} />}
        onEndReachedThreshold={1}

      />
    </View>
  )
}

export default ExercisesScreen

const styles = StyleSheet.create({})