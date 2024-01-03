import { useState } from 'react';

import { Text, View, Pressable } from '@/components';

export default function TabTwoScreen() {
  const [count, setCount] = useState(0);

  return (
    <View style={{ margin: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <Text style={{ textDecorationLine: 'underline' }}>
        This is an example of disabling specific translations
      </Text>

      {/* We don't want to re-translate the whole block every time count changes, so we disableContextualTranslation */}
      <Text translationOptions={{ disableContextualTranslation: true }}>
        Total count:{' '}
        {/* Since this number will be changing a lot, we'll also disable it's individual translation */}
        <Text style={{ fontWeight: 'bold' }} translationOptions={{ disableTranslation: true }}>
          {count}
        </Text>
      </Text>

      <Pressable
        style={{ width: 150, backgroundColor: '#0077b6', padding: 10 }}
        onPress={() => setCount(count + 1)}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Click me</Text>
      </Pressable>
    </View>
  );
}
