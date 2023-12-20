import { View, Text } from '@/components';

export default function TabOneScreen() {
  return (
    <View style={{ margin: 12, display: 'flex', flexDirection: 'column' }}>
      <Text style={{ fontSize: 24 }}>Tab One</Text>
      <Text>How are you doing today?</Text>
    </View>
  );
}
