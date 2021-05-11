import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AddNotes } from '../screens/AddNotes';
import { ViewNotes } from '../screens/ViewsNotes';
import { UpdateNote } from '../screens/UpdateNote';

const MainStack = createStackNavigator();

export function MainStackNavigator() {
  return (

    <MainStack.Navigator>


      <MainStack.Screen

        name={'ViewNotes'}
        component={ViewNotes}
        options={{
          title: 'ViewNotes',
          headerShown: false,

        }

        }
      />

      <MainStack.Screen

        name={'AddNotes'}
        component={AddNotes}
        options={{
          title: 'AddNotes',
          headerShown: false,

        }

        }
      />
      <MainStack.Screen

        name={'UpdateNote'}
        component={UpdateNote}
        options={{
          title: 'UpdateNote',
          headerShown: false,

        }

        }
      />

    </MainStack.Navigator>



  );
}
