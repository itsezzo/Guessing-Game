import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';
// import * as Font from 'expo-font';

import Colors from './constants/Colors';


SplashScreen.preventAutoHideAsync();

export default function App() {
  const [pickedNumber, setPickedNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(false)
  const [roundsNumber, setRoundsNumber] = useState(0)
  // console.log(pickedNumber)
  // console.log('App Component')

  const [isFontLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })

  // useEffect(() => {
  //   async function prepare() {
  //     await Font.loadAsync()
  //   }
  // })

  if(!isFontLoaded) {
    return <AppLoading />;
  }

  function handlePickedNumber(number) {
    setPickedNumber(number);
  }

  function hadleGameOver(finalNumber) {
    setGameIsOver(true);
    setRoundsNumber(finalNumber);
  }

  function handleRestart() {
    setGameIsOver(false);
    setRoundsNumber(0);
    setPickedNumber(null);
  }

  let screen = <StartGameScreen onPicked={handlePickedNumber} />;

  if(pickedNumber) {
    screen = <GameScreen guessedNumber={pickedNumber} onOver={hadleGameOver} />
  }

  if(gameIsOver) {
    screen = <GameOverScreen rounds={roundsNumber} number={pickedNumber} onReset={handleRestart} />
  }

  return (
    <LinearGradient
      colors={[Colors.primaryL1, Colors.secondry]}
      style={styles.rootScreen}
      start={{ x: 0, y: 0.1 }}
      end={{ x: 0, y: 1 }}
    >
      <ImageBackground
        imageStyle={styles.imageStyle}
        style={styles.rootScreen}
        source={require("./assets/images/background.png")}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    // backgroundColor: '#ddb52f',
  },
  imageStyle: {
    opacity: 0.15,
  }
});
