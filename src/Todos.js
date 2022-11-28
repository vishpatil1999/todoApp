import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  Button,
  FlatList,
  View,
  TouchableOpacity,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import Todo from './todo';
import Entypo from 'react-native-vector-icons/Entypo';
import CheckBox from '@react-native-community/checkbox';
// import { Appbar, TextInput, Button } from 'react-native-paper';

function Todos() {
  const [todo, setTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const ref = firestore().collection('todos');

  async function addTodo() {
    await ref.add({
      title: todo,
      complete: false,
    });
    setTodo('');
  }

  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        console.log('DOC', doc);
        const {title, complete} = doc.data();
        list.push({
          id: doc.id,
          title,
          complete,
        });
      });
      console.log('LIST', list);

      setTodos(list);

      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  async function toggleComplete(item) {
    console.log('Item', item);
    let complete = item.complete;
    await firestore().collection('todos').doc(item.id).update({
      complete: !complete,
    });
  }

  async function deletelist(item) {
    console.log('Item', item);
    await firestore().collection('todos').doc(item.id).delete();
  }

  const renderItem = (item, index) => {
    return (
      <View style={{margin: 10, flexDirection: 'row',alignSelf:'center'}}>
        <View
          style={{
            backgroundColor: 'black',
            width: 10,
            height: 10,
            alignSelf: 'center',
            margin: 5,
          }}></View>
        <View style={{width: '10%', alignItems: 'center', margin: 5}}>
          <CheckBox
            disabled={false}
            value={item.complete}
            onValueChange={() => toggleComplete(item)}
          />
        </View>
        <View style={{marginEnd: 5, width: '40%'}}>
          <Text style={{padding: 10, fontSize: 18, height: 44}}>
            {item.title}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: 'red',
            borderRadius: 5,
            width: '20%',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => deletelist(item)}>
            <Text style={{padding: 10, fontSize: 18, height: 44,color: 'white'}}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <>
      {/* <Appbar>
                <Appbar.Content title={'TODOs List'} />
            </Appbar> */}
      <FlatList
        style={{flex: 1}}
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => renderItem(item, index)}
      />
      <TextInput
        placeholder="New Todo"
        value={todo}
        onChangeText={setTodo}
        style={{height: 40, margin: 12, borderWidth: 1, padding: 10,width: '60%',alignSelf:'center'}}
      />
      <View
        style={{
          backgroundColor: 'blue',
          borderRadius: 5,
          width: '60%',
          alignItems: 'center',
          alignSelf: 'center',
          margin: 50,
        }}>
        <TouchableOpacity onPress={() => addTodo()}>
          <Text style={{padding: 10, fontSize: 18, height: 44, color: 'white'}}>
            Add TODO
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
export default Todos;
