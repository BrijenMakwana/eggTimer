import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Image, Pressable, TouchableOpacity } from 'react-native';
import { FontAwesome5,MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';
import { useState } from 'react';
import EggBoilItem from './components/eggBoilItem';

export default function App() {
  const egg = [{
    id: "1",
    boilType: "Soft",
    duration: 5000
  },
  {
    id: "2",
    boilType: "Medium",
    duration: 250000
  },
  {
    id: "3",
    boilType: "Hard",
    duration: 480000
  }
]

// duration for boiling according to user choice
const [duration, setDuration] = useState(egg[1].duration);

// set duration
const selectBoilType = (indexAt: number) => {
  setDuration(egg[indexAt].duration);
}

const timer = () =>{
  setInterval(() => {
    setDuration(duration => duration - 1000);
    console.log(duration);
    if(duration === 0){
      clearInterval();
    }
  }, 1000);
 
}

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.eggContent}>
        <View style={styles.eggImageContainer}>
          <MaterialCommunityIcons name="egg-easter" size={200} color="#DDDDDD"/>
        </View>
        <View style={styles.eggBoilType}>
          <EggBoilItem name={egg[0].boilType} onPress={()=>selectBoilType(0)}/>
          <EggBoilItem name={egg[1].boilType} onPress={()=>selectBoilType(1)}/>
          <EggBoilItem name={egg[2].boilType} onPress={()=>selectBoilType(2)}/>
        </View>
      </View>
      <View style={styles.eggTimer}>
        <Text style={styles.timerText}>{moment.utc(duration).format('mm:ss')}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={timer}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  eggContent:{
    marginTop: 10
  },
  eggBoilType:{
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "#30475E",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15
  },
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
  eggImageContainer:{
    padding: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  eggTimer:{
    backgroundColor: "#30475E",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    width: 150,
    height: 80,
    alignItems: "center",
    justifyContent: "center"
  },
  timerText:{
    fontSize: 40,
    color: "#fff",
    fontWeight: "bold",
  },
  button:{
    backgroundColor: "#F05454",
    padding: 10,
    borderRadius: 10,
    marginTop: 30,
    width: 150,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText:{
    fontSize: 35,
    color: "#fff",
    fontWeight: "bold",
  }
});
