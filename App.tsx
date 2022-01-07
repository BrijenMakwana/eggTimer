import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Image, Pressable, TouchableOpacity } from 'react-native';
import { Entypo,MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';
import { useEffect, useState } from 'react';
import EggBoilItem from './components/EggBoilItem';

const formatNumber = (number) => `0${number}`.slice(-2);

const getRemaining = (time) => {
    const mins = Math.floor(time / 60);
    const secs = time - mins * 60;
    return { mins: formatNumber(mins), secs: formatNumber(secs) };
}

export default function App() {
  const egg = [{
    id: "1",
    boilType: "Soft",
    duration: 10
  },
  {
    id: "2",
    boilType: "Medium",
    duration: 250
  },
  {
    id: "3",
    boilType: "Hard",
    duration: 480
  }
]

// duration for boiling according to user choice
const [noOfEggs,setNoOfEggs] = useState(1);
const [duration, setDuration] = useState(egg[1].duration);
const [isBoiling,setIsBoiling] = useState(false);
const { mins, secs } = getRemaining(((noOfEggs-1) * 15) + duration);
const [lastBoilType,setLastBoilType] = useState(1);
const [totalDuration, setTotalDuration] = useState(((noOfEggs-1) * 15) + duration)

// set duration
  const selectBoilType = (indexAt: number) => {
    setDuration(egg[indexAt].duration);
    setLastBoilType(indexAt);
  }

  const toggle = () => {
    setIsBoiling(!isBoiling);
  }

  const reset = () => {
    setDuration(egg[lastBoilType].duration);
    setTotalDuration(((noOfEggs-1) * 15) + duration);
    setIsBoiling(false);
    console.log(duration,"duration");
    console.log(totalDuration,"total duration");
  }

  const changeNoOfEggs = (type: String) =>{
    if(!isBoiling){
      if(type === "plus"){
        setNoOfEggs(noOfEggs + 1);
      }
      else if(noOfEggs > 1){
        setNoOfEggs(noOfEggs - 1);
      }
    }
    
    
  }

  useEffect(() => {
    let interval = null;
    if (isBoiling && totalDuration>=3) {
      interval = setInterval(() => {
        setDuration(duration => duration - 1);
        setTotalDuration(((noOfEggs-1) * 15) + duration);
        console.log(totalDuration);
      }, 1000);
    } else {
      clearInterval(interval);
      reset();
    }
    return () => clearInterval(interval);
  }, [isBoiling, duration]);


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.eggContent}>
        <View style={styles.eggImageContainer}>
          <MaterialCommunityIcons name="egg-easter" size={200} color="#DDDDDD"/>
        </View>
        <View style={styles.eggBoilType}>
          <EggBoilItem name={egg[0].boilType} onPress={()=>selectBoilType(0)} isBoiling={isBoiling}/>
          <EggBoilItem name={egg[1].boilType} onPress={()=>selectBoilType(1)} isBoiling={isBoiling}/>
          <EggBoilItem name={egg[2].boilType} onPress={()=>selectBoilType(2)} isBoiling={isBoiling}/>
        </View>
      </View>
      <View style={styles.eggTimer}>
        <Text style={styles.timerText}>{`${mins}:${secs}`}</Text>
        <Text style={styles.currentBoilType}>{noOfEggs} {egg[lastBoilType].boilType} {noOfEggs === 1 ? "Egg" : "Eggs"}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggle}>
          <Text style={styles.buttonText}>{isBoiling ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={reset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.noOfEggs}>
        <Pressable onPress={()=>changeNoOfEggs("minus")}>
          <Entypo name="squared-minus" size={40} color="#F05454" />
        </Pressable>
        <Text style={styles.noOfEggsText}>{noOfEggs}</Text>
        <Pressable onPress={()=>changeNoOfEggs("plus")}>
          <Entypo name="squared-plus" size={40} color="#F05454" />
        </Pressable>
        
      </View>
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
  eggImageContainer:{
    padding: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  eggTimer:{
    backgroundColor: "#30475E",
    padding: 10,
    borderRadius: 10,
    width: "40%",
    height: "12%",
    alignItems: "center",
    justifyContent: "center"
  },
  timerText:{
    fontSize: 40,
    color: "#fff",
    fontWeight: "bold",
  },
  currentBoilType:{
    fontSize: 17,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 5
  },
  buttonContainer:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%"
  },
  button:{
    backgroundColor: "#F05454",
    padding: 10,
    borderRadius: 10,
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText:{
    fontSize: 35,
    color: "#fff",
    fontWeight: "bold",
  },
  noOfEggs:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    width: "40%",
  },
  noOfEggsText:{
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
  }
});
