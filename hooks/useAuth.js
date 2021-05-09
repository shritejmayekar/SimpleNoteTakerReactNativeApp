import React from 'react';
import axios from 'axios';
import AsyncStorage from "@react-native-community/async-storage";

import {
  ToastAndroid,
  Platform
} from "react-native";

import { BASE_URL } from '../config';
import { createAction } from '../utils/createAction';
import { sleep } from '../utils/sleep';

export function useAuth() {
  const [state, dispatch] = React.useReducer(
    (state, action) => {
      switch (action.type) {
        case 'SET_USER':
          return {
            ...state,
            user: { ...action.payload },
          };
        case 'REMOVE_USER':
          return {
            ...state,
            user: undefined,
          };
        case 'SET_LOADING':
          return {
            ...state,
            loading: action.payload,
          };
        default:
          return state;
      }
    },
    {
      user: undefined,
      loading: true,
    },
  );
  const auth = React.useMemo(
    () => ({
      login: async (emailId, password) => {
        try {
          const { data } = await axios.post(`${BASE_URL}/api/auth/login/`, {
            email: emailId,
            password: password,
          });
          const user = {
            token: data.token,
          };
          if (Platform.OS != 'android') {
            ToastAndroid.show("Login Successfully", ToastAndroid.SHORT);

          } else {
            ToastAndroid.show("Login Successfully", ToastAndroid.SHORT);
          }

          await AsyncStorage.setItem('user', JSON.stringify(user));
          dispatch(createAction('SET_USER', user));



        } catch (err) {
          throw err
        }
        // console.log(data);
        // if(data.code === 200) {
        // const user = {
        //   token: data.token,
        // };


        // } else {
        //         throw data.message

        // }
      },
      logout: async () => {
        await AsyncStorage.removeItem('user');
        dispatch(createAction('REMOVE_USER'));
      },
      register: async (emailId, userName, password) => {
        await sleep(2000);
        await axios.post(`${BASE_URL}/api/auth/register/`, {
          email: emailId,
          password: password,
          username: userName
        });
        if (Platform.OS != 'android') {
          ToastAndroid.show("Register Successfully", ToastAndroid.SHORT);

        } else {
          ToastAndroid.show("Register Successfully", ToastAndroid.SHORT);
        }
      },
    }),
    [],
  );
  React.useEffect(() => {
    sleep(2000).then(() => {
      try {
        AsyncStorage.getItem('user').then(user => {
          if (user) {
            dispatch(createAction('SET_USER', JSON.parse(user)));
          }
          dispatch(createAction('SET_LOADING', false));
        });
      } catch (err) {
        dispatch(createAction('SET_LOADING', false));

      }


    });
  }, []);
  return { auth, state };
}
