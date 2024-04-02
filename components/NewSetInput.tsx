import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { useState } from 'react';
import { gql } from 'graphql-request';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import client from '@/graphqlClient';

type NewSetInputProps = {
    exerciseName: string   
}

const mutationDocument = gql`
mutation MyMutation($newSet: NewSet!) {
  insertSet(
    collection: "set"
    database: "fitness"
    dataSource: "Cluster0"
    document: $newSet
  ) {
    insertedId
  }
}
`

const NewSetInput = ({ exerciseName }: NewSetInputProps) => {
  
  const queryClient = useQueryClient()

  const {mutate, isError, isPending} = useMutation({
    mutationFn: (newSet) =>client.request(mutationDocument, {newSet}),
    onSuccess: ()=>{
      queryClient.invalidateQueries({ queryKey: ['sets', exerciseName] })
      setReps('')
      setWeight('')
    }
  })
    
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');

    const addSet = ()=>{
      const newSet = {
        exercise: exerciseName,
        reps: Number.parseInt(reps),
      }
      if(Number.parseFloat(weight)){
        newSet.weight = Number.parseFloat(weight)
      }
      mutate(newSet)
    }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TextInput
          value={reps}
          onChangeText={setReps}
          placeholder="Reps"
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput
          value={weight}
          onChangeText={setWeight}
          placeholder="Weight"
          style={styles.input}
          keyboardType="numeric"
        />
        <Button title={isPending ? 'Adding...' : 'Add'} onPress={addSet} />
      </View>
      {isError && <Text style={{ color: 'red' }}>Failed to add the set</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    gap: 5,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gainsboro',
    padding: 10,
    flex: 1,
    borderRadius: 5,
  },
});

export default NewSetInput;