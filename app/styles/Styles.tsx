import { StyleSheet } from "react-native";

const styles = () => {
  //const colorScheme = useColorScheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column', 
      alignItems: "center",
      //justifyContent: "center",
      //backgroundColor: colorScheme === 'dark' ? 'white' : 'black',
    },
    content: {
      flex: 1,
      padding: 20,
      alignItems: 'center',
      backgroundColor: '#f0f09aff',
    },
    row: {
      flexDirection: 'row', 
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      height: 'auto',
      gap: 3,
    },
    col :{
      flexDirection: 'column', 
      justifyContent: 'space-evenly',
      alignItems: 'center',
      width: 'auto',
      height: 'auto',
      gap: 3,
      //backgroundColor: colorScheme === 'dark' ? 'white' : 'black',
    },
    bottomSheet: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#fdf6d7ff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      borderWidth: 0.5,
      borderColor: '#c7bcbcff',
      padding: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 8,
    },
    title: {
      fontSize: 22,
      //fontWeight: "300",
      //color: colorScheme === 'dark' ? 'white' : 'black',
    },
    h1: {
      fontSize: 22,
      //fontWeight: "400",
      //color: colorScheme === 'dark' ? 'white' : 'black',
    },
    h2: {
      fontSize: 20,
      //fontWeight: "300",
      //color: colorScheme === 'dark' ? 'white' : 'black',
    },
    h3: {
      fontSize: 18,
      width: '100%',
      textAlign: 'center',
      //fontWeight: "300",
      //color: colorScheme === 'dark' ? 'white' : 'black',
    },
    text: {
      color: 'black',
    },
    textSmall: {
      fontSize: 10,
      //color: 'black',
    },
    link: {
      color: '#fff',
      textDecorationLine: 'underline',
      textAlign: 'center',
      fontSize: 20,
      padding: 10,
      marginTop: 10,
    },
    linkButton: {
      color: '#fff',
      padding: 10,
      borderWidth: 1,
      borderRadius: 10,
      //elevation: 1,
    },
    input: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      backgroundColor: '#fff',
    },
    button: {
      fontSize: 20,
      height: 'auto',
      width: '74%',
      textAlign: 'center',
      color: '#fff',
      padding: 10,
      marginTop: 10,
      backgroundColor: '#3b82f6',
      borderRadius: 10,
    },
  });
};

export default styles();