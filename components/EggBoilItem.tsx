import React from 'react';
import { Pressable, StyleSheet, Text} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

// this component takes 3 arguments
// 1.name of the boil type
// 2.onPress function
// 3.isBoiling to disabled it when eggs are boiling

export type EggBoilItemProps = {
    name: String;
    onPress: ()=> void;
    isBoiling: boolean;

}

const EggBoilItem = (props: EggBoilItemProps) => {
    return (
        <Pressable 
            style={styles.eggIcon} 
            onPress={props.onPress} 
            // disabled the button if eggs are currently boiling
            disabled={props.isBoiling}
        >
            <FontAwesome5 name="egg" size={24} color="#F05454" />
            <Text style={styles.eggBoilTypeText}>{props.name}</Text>
        </Pressable>
    )
}

export default EggBoilItem

const styles = StyleSheet.create({
    eggIcon:{
        marginHorizontal: 5,
        alignItems: "center",
        paddingHorizontal: 15,
      },
    eggBoilTypeText:{
        color: "#fff",
        fontSize: 17,
        fontWeight: "500",
        marginTop: 10
      },
})
