import type { Meta, StoryObj } from '@storybook/react';

import { CreateElementDecorator } from 'app/providers/.storybook/CreateElementDecorator';
import { layoutStyle } from 'app/providers/.storybook/decoratorStyles';
import Preloader from 'components/UI/Preloader/Preloader';

const meta = {
  title: 'components/Preloader',
  component: Preloader,
} satisfies Meta<typeof Preloader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PreloaderActive: Story = {
  args: {},
  decorators: [CreateElementDecorator({ ...layoutStyle })],
};
