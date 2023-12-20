# Lexicon Example - Expo

This is an example Expo project leveraging the `@lexiconjs/react` package. The usage is similar for all react-based apps.

## Getting Started

First, run the application locally:

```bash
yarn start
```

Then, launch the application in your browser or on a local device to see the result.

## How is Lexicon Used?

First, the TranslationProvider is included within the `app/_layout.tsx` file. This allows us to use any Lexicon hooks or components within the application.

Then, we have abstracted our two primary text components from the `tamagui` component library in our `components/Heading.tsx` and `components/Text.tsx` files. We find that this helps simplify the usage and avoid any mistakes in implementation. However, you could just wrap anything you'd like to translate directly instead.

## Learn More

To learn more about Expo, take a look at the following resources:

- [Expo Documentation](https://docs.expo.dev/) - learn about expo features.
- [React Native Documentation](https://reactnative.dev/docs/getting-started) - learn about react native.
