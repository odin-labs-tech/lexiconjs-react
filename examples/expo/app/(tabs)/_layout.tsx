import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTranslation } from '@lexiconjs/react';
import { Tabs } from 'expo-router';
import React from 'react';

// import { useTranslation } from '../../dist';
import { useClientOnlyValue } from '../hooks';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: useTranslation('Nesting Translations').translation,
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: useTranslation('Disabling Translations').translation,
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          title: useTranslation('Using Context').translation,
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </Tabs>
  );
}
