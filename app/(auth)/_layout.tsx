/* eslint-disable prettier/prettier */
import { Stack } from 'expo-router';
import React from 'react';
import {StatusBar} from 'expo-status-bar';

const AuthLayout = () => {
    return (
        <>
           <Stack>
            <Stack.Screen
            name="login"
           
            />
             <Stack.Screen
            name="signup"
            />
           </Stack>
           <StatusBar backgroundColor={'#161622'} style='light'/>
        </>
    );
}

export default AuthLayout;
