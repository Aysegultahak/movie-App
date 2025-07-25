import { SavedMoviesProvider } from '@/context/SavedMoviesContext';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabsLayout() {
  return (
    <SavedMoviesProvider>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#0f0D23',
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'home',
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: 'search',
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search-outline" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="saved"
          options={{
            title: 'saved',
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="bookmark-outline" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'profile',
            headerShown: false,
            tabBarActiveTintColor: 'red',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </SavedMoviesProvider>
  );
}