import { StyleSheet, Text, View, FlatList, ActivityIndicator, Button, StatusBar } from 'react-native'
import React from 'react'
import ExerciseListItem from '@/components/ExerciseListItem'
import { useInfiniteQuery } from '@tanstack/react-query'
import { gql } from 'graphql-request'
// client to make a request from GraphClient
import client from '@/graphqlClient'
import { useAuth } from '@/authContext/authContext'
import { Redirect } from 'expo-router'

// getting the query from ibm stepzen to the list the exercise
const exercisesQuery = gql`
query exercises($muscle: String, $name: String, $offset: Int) {
  exercises(muscle: $muscle, name: $name, offset: $offset) {
    name
    muscle
    equipment
  }
}
`;

const ExercisesScreen = () => {
  const {username} = useAuth()
  // Queries the data from the stepzen using react query 
  const {data, isLoading, error, fetchNextPage, isFetchingNextPage} = useInfiniteQuery({
    queryKey:['exercises'],
    queryFn: async ({ pageParam })=> client.request(exercisesQuery, {
      offset: pageParam
    }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => pages.length * 10,
  })

  const loadMore = ()=>{
    if (isFetchingNextPage){
      return
    }
    fetchNextPage()
  }

    if (isLoading){
      return (<ActivityIndicator />)
    }

    if(error){
      return <Text>Failed to fecth exercises</Text>
    }

    if (!username) {
      return <Redirect href={'/auth'} />;
    }

    const exercises = data?.pages.flatMap( page => page.exercises )

  return (
    <View style={styles.container}>

      <FlatList
        data={exercises}
        contentContainerStyle={{ gap: 5 }}
        style={{ padding: 10 }}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item }) => <ExerciseListItem item = {item} />}
        onEndReachedThreshold={1}
        onEndReached={loadMore}
      />

      <StatusBar style="auto" />
    </View>
  )
}

export default ExercisesScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
})