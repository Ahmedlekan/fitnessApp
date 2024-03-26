import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { useState } from 'react';

type NewSetInputProps = {
    exerciseName: string   
}

const NewSetInput = ({ exerciseName }: NewSetInputProps) => {
    const [isError, setIsError] = useState(false)
    const [isPending, setIsPending] = useState(false)
    
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');

    const addSet = ()=>{
      console.log("Add set", reps, weight)

      setReps('')
      setWeight('')
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