import React from 'react';
import firestore from '@react-native-firebase/firestore';
import { List } from 'react-native-paper';
import { FlatList } from 'react-native';

function Todo({ id, title, complete ,item}) {
  console.log("ITEM",item);
  async function toggleComplete() {
    await firestore()
      .collection('todos')
      .doc(id)
      .update({
        complete: !complete,
      });
  }

  return (
    <FlatList onPress={() => toggleComplete()} />
    // <List.Item
    //   title={title}
    //   onPress={() => toggleComplete()}
    //   left={props => (
    //     <List.Icon {...props} icon={complete ? 'check' : 'cancel'} />
    //   )}
    // />

  );
}

export default React.memo(Todo);