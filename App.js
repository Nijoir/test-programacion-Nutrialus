import React, { useState } from 'react'
import { render } from 'react-dom';
import {StyleSheet,Text,FlatList,ActivityIndicator, View,Image, TouchableOpacity} from 'react-native'

export default class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      nombrePaciente: String,
      emailPaciente: String,
      telefonoPaciente: String,
      imagenPaciente: String,

    }
    
  }

  botonActualizar = () => {
    
    fetch('https://0q27loouph.execute-api.us-east-1.amazonaws.com/')
         .then((response) => response.json() )
         .then((respuestaJson) => {
           this.setState({
               isLoading: false,
               nombrePaciente: respuestaJson.name,
               emailPaciente: respuestaJson.email,
               telefonoPaciente: respuestaJson.phone,
               imagenPaciente: respuestaJson.image,
               
           })
 
         })
         .catch((error) => {
           console.log(error)
         });
   
 }


  async componentDidMount() {
    
    return fetch('https://0q27loouph.execute-api.us-east-1.amazonaws.com/')
          .then((response) => response.json() )
          .then((respuestaJson) => {
            this.setState({
                isLoading: false,
                nombrePaciente: respuestaJson.name,
                emailPaciente: respuestaJson.email,
                telefonoPaciente: respuestaJson.phone,
                imagenPaciente: respuestaJson.image,
                
            })

          })
          .catch((error) => {
            console.log(error)
          });
          
  }
  
  render() {

   

    if(this.state.isLoading){
      return(
        <View style={styles.container}>
          <ActivityIndicator />
        </View>

      )
    }else{
      
      let datosPersona = [this.state.nombrePaciente,this.state.emailPaciente,this.state.telefonoPaciente]
      let imagen = this.state.imagenPaciente
      
        
      return(
        
            <View style = {styles.container}>
              <Text style={flattenStyle}>Nutrialus</Text>
              <Image key = {imagen} style = {styles.imagen} source = {{uri: imagen + '?' + new Date()}} resizeMode = 'contain'  />
             
              <View style = {styles.vistaDatos}>
                <FlatList
                  data = {[
                    {key: 'Nombre:'},
                    {key: 'Email:'},
                    {key: 'Telefono:'},
                  ]}
                  renderItem = {({item}) =>
                    <Text style = {styles.etiquetaDato}>
                      {item.key}
                      
                    </Text>
                }
                />
                <FlatList
                  data = {datosPersona}
                  renderItem = {({item}) => (
                    <Text style = {styles.datos}>
                      {item}
                    </Text>
                  )}
                />
              </View>
              <TouchableOpacity style = {styles.button} onPress = {this.botonActualizar}>
                    <Text style = {styles.nombreBoton}> Actualizar</Text>
              </TouchableOpacity>
            </View>


      );
      
    }
  }



  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `#87cefa`,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    
    

  },
  vistaDatos: {
    flex: 0.3,
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: 3,
    backgroundColor: `#ffdab9`,
    maxWidth: 400,
    maxHeight: 120,
    alignItems: 'center',
    
    

  },
  imagen: {
    flex: 0.25,
    height: 240,
    width: 240,
    resizeMode: 'contain',
    borderRadius: 120,
    marginBottom: 40,
    

  },
  titulo: {
    flex: 0.1,
    fontSize: 14,
    fontWeight: "bold",
    justifyContent: 'flex-start',
    marginBottom: 30,
    
  },
  datos: {
    color: `#2e8b57`,
    textAlign: 'justify',
    margin: 5,
    fontSize: 15,
    fontWeight: "bold",
    
  },
  button: {
    flex: 0.035,
    alignItems: "center",
    backgroundColor: `#ff7f50`,
    padding: 12,
    marginTop: 50,
    borderRadius: 10,
    alignContent: 'center',
    
  },
  etiquetaDato: {
    alignSelf: 'flex-start',
    fontWeight: "bold",
    marginHorizontal: "1%",
    margin: 5.5,
  },
  nombreBoton: {
    fontWeight: "bold",
    
  }

});


const typography = StyleSheet.create({
  header: {
    color: `#2e8b57`,
    fontSize: 45,

    
  }
});

const flattenStyle = StyleSheet.flatten([
  styles.titulo,
  typography.header
]);

