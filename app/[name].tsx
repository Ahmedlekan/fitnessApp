import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import { Stack } from 'expo-router'
import { useLocalSearchParams } from 'expo-router'
import NewSetInput from '@/components/NewSetInput'
import { gql } from 'graphql-request'
import { useQuery } from '@tanstack/react-query'
import graphqlClient from "../graphqlClient"
import SetsList from '@/components/SetsList'

// getting the query from ibm stepzen to the list of each exercise 
const exerciseQuery = gql`
query exercises($name: String) {
  exercises(name: $name) {
    name
    muscle
    instructions
    equipment
  }
}
`

const DetailsScreen = () => {
  // using expo router to get the name of each exercise
    const {name} = useLocalSearchParams()
    // Queries the data from the stepzen using react query
    const {data, isLoading, error} = useQuery({
      queryKey:['exercises', name],
      queryFn: ()=> graphqlClient.request(exerciseQuery, {name})
    })

    const [isInstructionExpanded, setIsInstructionExpanded] = useState(false);

    if (isLoading){
      return <ActivityIndicator />
    }

    if (error){
      return <Text>Failed to fetch</Text>
    }

    const exercise = data.exercises[0]

    if (!exercise){
        return (
            <View >
                <Text>Exercise not found</Text>
            </View>
        )
    }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: exercise.name }} />

      <SetsList 
        exerciseName={exercise.name}
        ListHeaderComponent={()=>(
        <View style={{gap: 5}}>

          <View style={styles.panel2}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <Text style={styles.exerciseSubtitle}>
              <Text style={styles.subValue}>{exercise.muscle}</Text>
              <Text style={styles.subValue}>{exercise.equipment}</Text>
            </Text>
          </View>

          <View style={styles.panel}>
            <Text
              style={styles.instructions}
              numberOfLines={isInstructionExpanded ? 0 : 3}
            >
              {exercise.instructions}
            </Text>
            <Text
              onPress={() => setIsInstructionExpanded(!isInstructionExpanded)}
              style={styles.seeMore}
            >
              {isInstructionExpanded ? 'See less' : 'See more'}
            </Text>
          </View>

          <NewSetInput exerciseName={exercise.name} />

        </View>
      )} />
    </View>
  )
}

export default DetailsScreen

const styles = StyleSheet.create({
  container: {
    padding: 10,
    
  },
  panel: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  panel2:{
    padding: 10,
    borderRadius: 5,
    alignItems:"center",
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: '500',
    color: "#fff"
  },
  exerciseSubtitle: {
    color: 'dimgray',
  },
  subValue: {
    textTransform: 'capitalize',
  },
  instructions: {
    fontSize: 16,
    lineHeight: 22,
  },
  seeMore: {
    alignSelf: 'center',
    padding: 5,
    fontWeight: '600',
    color: 'gray',
  },
});