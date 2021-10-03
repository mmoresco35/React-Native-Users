import { StyleSheet } from 'react-native';
//aplication styles definition
export default StyleSheet.create({
    button:{
    flex: 1, 
    backgroundColor: 'white', 
    padding: '2%', 
    margin: '2%',
    borderColor:'black',
    borderWidth:1
    },
    buttonText:{
        textAlign: 'center'
    },
    row:{
        flexDirection: 'row',
    },
    flatlist:{
        margin: '2%'
    },
    listItem:{
        margin:'2%',
        padding:'2%',
        backgroundColor: 'white',
    },
    header:{
        flexDirection: 'row',
        marginTop: 'auto',
    },
    headerButton:{
        flex:1,
            borderColor: 'black',
            borderWidth: 1,
            padding: '2%'
    },
    input:{
        borderBottomColor: 'black',
            borderBottomWidth: 2,
            margin: '2%',
    },
    buttonRow:{
        flexDirection: 'row',
          alignSelf: 'flex-end',
          marginTop: 'auto',
          padding: '5%',
    },
    operatorBackground:{
            flex: 1,
            backgroundColor: '#9A9A9ACC',
    },
    operatorBox:{
        margin: '10%',
        backgroundColor: 'white',
      }

});