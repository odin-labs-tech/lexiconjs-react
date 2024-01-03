import { Text, View } from '@/components';

export default function TabThreeScreen() {
  return (
    <View style={{ margin: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <Text style={{ textDecorationLine: 'underline' }}>This is an example of using context</Text>

      {/* This is without any context (could be translated randomly if only providing one word with multiple meanings) */}
      <Text>This is how the word "Top" is translated without context:</Text>
      <Text style={{ fontWeight: 'bold' }}>Top</Text>

      {/* This is with providing context (will be translated specifically to your example) */}
      <Text>This is how the word "Top" is translated with the context "Top Recommendations": </Text>
      <Text style={{ fontWeight: 'bold' }} translationOptions={{ context: 'Top Recommendations' }}>
        Top
      </Text>
    </View>
  );
}
