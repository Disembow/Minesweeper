import type { Decorator } from '@storybook/react';

type GetDecorator = Record<string, string>;

export const CreateElementDecorator = (styles?: GetDecorator) => {
  const decorator: Decorator = (Story) => (
    <div style={styles}>
      <Story />
    </div>
  );

  return decorator;
};
