[![GitHub][opengraph-image]][opengraph-image-url]

# shadcn/ui and tailwindcss v4 monorepo template

This template is for creating a monorepo with Turborepo, shadcn/ui, tailwindcss v4, and react v19.

## One-click Deploy

You can deploy this template to Vercel with the button below:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?build-command=cd+..%2F..%2F+%26%26+pnpm+turbo+build+--filter%3Dweb...&demo-description=This+is+a+template+Turborepo+with+ShadcnUI+tailwindv4&demo-image=%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F2JxNyYATuuV7WPuJ31kF9Q%2F433990aa4c8e7524a9095682fb08f0b1%2FBasic.png&demo-title=Turborepo+%26+Next.js+Starter&demo-url=https%3A%2F%2Fexamples-basic-web.vercel.sh%2F&from=templates&project-name=Turborepo+%26+Next.js+Starter&repository-name=turborepo-shadcn-tailwind&repository-url=https%3A%2F%2Fgithub.com%2Flinkb15%2Fturborepo-shadcn-ui-tailwind-4&root-directory=apps%2Fweb&skippable-integrations=1)

## Usage

in the root directory run:

```bash
pnpm install
pnpm dev
```

## Adding components

To add components to your app, run the following command at the root of your `web` app:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

This will place the ui components in the `packages/ui/src/components` directory.

## Tailwind

Your `globals.css` are already set up to use the components from the `ui` package which is imported in the `web` app.

## Using components

To use the components in your app, import them from the `ui` package.

```tsx
import { Button } from '@workspace/ui/components/ui/button';
```

## More Resources

- [shadcn/ui - Monorepo](https://ui.shadcn.com/docs/monorepo)
- [Turborepo - shadcn/ui](https://turbo.build/repo/docs/guides/tools/shadcn-ui)
- [TailwindCSS v4 - Explicitly Registering Sources](https://tailwindcss.com/docs/detecting-classes-in-source-files#explicitly-registering-sources)

[opengraph-image]: https://turborepo-shadcn-tailwind.vercel.app/opengraph-image.png
[opengraph-image-url]: https://turborepo-shadcn-tailwind.vercel.app/
