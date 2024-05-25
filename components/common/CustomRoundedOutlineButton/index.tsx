import { View, Text, TouchableOpacity, TouchableOpacityComponent } from 'react-native'
import React from 'react'

type Props = {
    text: string,
    onPressEvent?: ()=> void
}

const CustomRoundedOutlineButton = ({text, onPressEvent}: Props) => {
  return (
    <TouchableOpacity className="border-[1px] border-grey rounded-3xl px-4 py-2" onPress={onPressEvent}>
        <Text className="text-text font-extrabold text-md text-center">
            {text}
        </Text>
    </TouchableOpacity>
  )
}

export default CustomRoundedOutlineButton;