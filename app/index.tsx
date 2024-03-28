import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import ExerciseListItem from '@/components/ExerciseListItem'
import { useQuery } from '@tanstack/react-query'
import { gql } from 'graphql-request'
import client from '@/graphqlClient'
import NewSetInput from '@/components/NewSetInput'


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
  // Queries
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