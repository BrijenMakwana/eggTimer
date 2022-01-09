import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Image, Pressable, TouchableOpacity, Alert } from 'react-native';
import { Entypo,MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import EggBoilItem from './components/EggBoilItem';

// format the duratiuon in mm:ss format
const formatNumber = (number) => `0${number}`.slice(-2);

// get remaining duration
const getRemaining = (time) => {
    const mins = Math.floor(time / 60);
    const secs = time - mins * 60;
    return { mins: formatNumber(mins), secs: formatNumber(secs) };
}

export default function App() {

  //this array contains details about eggs, boil type and duration
  const egg = [{
    id: "1",
    boilType: "Soft",
    duration: 190
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

// number eggs user want to boil
const [noOfEggs,setNoOfEggs] = useState(1);

// duration for 1 egg
const [duration, setDuration] = useState(egg[1].duration);

// if eggs are currently boiling
const [isBoiling,setIsBoiling] = useState(false);

// saving min and sec for the duration
const { mins, secs } = getRemaining(((noOfEggs-1) * 15) + duration);

// it will reset the last boiling type user selected
const [lastBoilType,setLastBoilType] = useState(1);

// calculate total duration on the basis of number of eggs
const [totalDuration, setTotalDuration] = useState(((noOfEggs-1) * 15) + duration);


// selecting boil type
  const selectBoilType = (indexAt: number) => {
    setDuration(egg[indexAt].duration);
    setLastBoilType(indexAt);
  }

  // toggle if it's boiling or not
  const toggle = () => {
    setIsBoiling(!isBoiling);
  }

  // reset the data after timer ends
  const reset = () => {
    setDuration(egg[lastBoilType].duration);
    setTotalDuration(((noOfEggs-1) * 15) + duration);
    setIsBoiling(false);
   
  }

  // increase or decrease the number of eggs
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

  // timer logic
  useEffect(() => {
    let interval = null;
    if (isBoiling && totalDuration>=3) {
      interval = setInterval(() => {
        setDuration(duration => duration - 1);
        setTotalDuration(((noOfEggs-1) * 15) + duration);
      }, 1000);
    } else{
      clearInterval(interval);
      if(isBoiling){
        Alert.alert("Done","Your Eggs are ready!!!",[
          {
            text: "Ok",
            onPress: ()=>{},
            style: "cancel"
          }
        ])
      }
      reset();
      
    }
    return () => clearInterval(interval);
  }, [isBoiling, duration]);


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.eggContent}>
        <View style={styles.eggImageContainer}>
          {
            // change the image based on boiling or not
            isBoiling ? 
            <Image
              source={require("./assets/boiling.png")}
              style={styles.boilingImage}
              resizeMode="contain"
            /> :
            <MaterialCommunityIcons name="egg-easter" size={200} color="#DDDDDD"/>
          }
          
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
        <TouchableOpacity 
          style={[styles.button,{
            backgroundColor: isBoiling ? "#222831" : "#F05454"
          }]} 
          onPress={toggle} 
          disabled={isBoiling}
        >
          <Text 
            style={[styles.buttonText,{
              color: isBoiling ? "#222831" : "#fff"
            }]}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={reset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
      
      <View 
        style={[styles.noOfEggs,{
        opacity: isBoiling ? 0 : 1
          }]}
      >
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
  boilingImage:{
    height: 200,
    width: 200
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
