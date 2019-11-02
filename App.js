import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import axios from 'axios';


let db = [
  {
    name: 'Coca-Cola 0,5l',
    price: 2.08,
    id: 0
  },
  {
    name: 'Ristorante: pesto-salame-mozzarella',
    price: 2.99,
    id: 1,
  },
  {
    name: 'Flamingo iso',
    price: 7.85,
    id: 2,
  },
  {
    name: 'Perhe wok',
    price: 2.80,
    id: 3,
  }
]


const App = () => {
const [ items, setItems ] = useState([]);
const [ receipt, setReceipt ] = useState([]);
const [ newItem, setNewItem ] = useState('');

const date = new Date().getDate(); //Current Date
const month = new Date().getMonth() + 1; //Current Month
const year = new Date().getFullYear(); //Current Year
const hours = new Date().getHours(); //Current Hours
const min = new Date().getMinutes(); //Current Minutes
const sec = new Date().getSeconds(); //Current Seconds

/* useEffect(() => {
  fetch('http://192.168.1.149:8080/api/products')
  .then(response => response.json())
  .then(responseJson => {
    setItems(responseJson);
  })
  .catch(error => {
    console.error(error, "this is the state");
  })
}, [])
 */
  useEffect(() => {
    axios.get('http://192.168.1.149:8080/api/products')
    .then(res => {
      setItems(res.data._embedded.products)
    })
  }, [])
 
const mapItems = () => {
//  console.log(items._embedded.object);
//  
if(items.length > 0) {
return items.map(item => <View key={item._links.self.href}><Text>{item.name}  {item.price}e</Text></View>)
}
}
const addNewItem = () => {
  setItems(items.concat({
    name: newItem,
    price: parseFloat(newPrice), 
    id: (date + "/" + month + "/" + year + " // " + hours + ":" + min + ":" + sec) + Math.random(),
  }));
  setNewItem('');
  setNewPrice(0);
}

const deleteItem = (id) => {
  setItems(items.filter(item => item.id !== id))
}

  return (
    <View style={{padding: 50}}>

    <View>
      {
        mapItems()
      }
    </View>


{/*       <View style={styles.inputView}>
        <TextInput
        placeholder="Item name:" 
        style={styles.input}
        onChangeText={text => setNewItem(text)}
        value={newItem}/>
      </View>
      <View style={styles.inputView}>
        <TextInput
        placeholder="Item Price:" 
        style={styles.input}
        onChangeText={number => setNewPrice(number)}
        value={String(newPrice)}
        numericvalue
        keyboardType="numeric"/>
        <Button title="Save" 
        onPress={addNewItem}/>
      </View>
      <View>
        <Text>Total price {totalPrice} euros</Text>
        <Button title="show receipt"
        onPress={() => console.log(receipt)}/>
      </View>
      <View>
        {items.map(item =><View key={item.id}>
          <Text>{item.name}</Text>
          <Text>{item.price}</Text>
          <Button title="Delete"
          onPress={() => deleteItem(item.id)}
          style={styles.itemAction}/>
          <Button title="Add"
          onPress={() => setReceipt(receipt.concat(item))}
          style={styles.itemAction}/>
        </View>)}
      </View>
 */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 10
  },
  inputView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemAction: {
    width: '20%',
  }
})

export default App