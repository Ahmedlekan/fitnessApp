import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type SetListItemProps = {
    set: any
}

const SetListItem = ({set}: SetListItemProps) => {
  return (
    <View style={{backgroundColor: 'white', marginVertical: 5,padding: 10,
        borderRadius: 5, gap: 5}}
    >
      <Text style={{ fontWeight: 'bold' }}>
        {set.reps} x {set.weight}
      </Text>
    </View>
  )
}

export default SetListItem

const styles = StyleSheet.create({})