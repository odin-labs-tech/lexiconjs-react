import { Link, Stack } from 'expo-router';

import { Text, Box } from '@/components';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Box>
        <Text>This screen doesn't exist.</Text>

        <Link href="/">
          <Text color="blue">Go to home screen!</Text>
        </Link>
      </Box>
    </>
  );
}
