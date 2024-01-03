import { View, Text } from '@/components';

export default function TabOneScreen() {
  return (
    <View style={{ margin: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <Text style={{ textDecorationLine: 'underline' }}>
        This is an example of nested text formatting
      </Text>

      <Text>
        How are you doing <Text style={{ fontWeight: 'bold' }}>today</Text>?
      </Text>
    </View>
  );
}
