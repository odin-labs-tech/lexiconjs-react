# Lexicon Example - Next.js

This is an example Next.js project leveraging the `@lexiconjs/react` package. The usage is similar for all react-based apps.

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## How is Lexicon Used?

First, the TranslationProvider is included within the `app/layout.tsx` file. This allows us to use any Lexicon hooks or components within the application.

Then, Lexicon is primarily used to wrap each individual text elements since this project leverages `tailwindcss` for styling rather than a custom component library. You can create an abstracted component if you'd like to help simplify the usage, or just wrap anything you'd like to translate.

For an example of how a custom component can be used to abstract away the Lexicon usage, see the `examples/expo` example.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
