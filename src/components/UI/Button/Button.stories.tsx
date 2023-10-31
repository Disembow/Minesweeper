import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';
import { ButtonSize, ButtonTheme } from './types/ButtonTypes';
import { CreateElementDecorator } from 'app/providers/.storybook/CreateElementDecorator';
import { layoutStyle } from 'app/providers/.storybook/decoratorStyles';

const meta = {
  title: 'components/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StrokeSizeSButton: Story = {
  args: {
    children: 'Click',
    theme: ButtonTheme.STROKE,
    size: ButtonSize.S,
  },
  decorators: [CreateElementDecorator({ ...layoutStyle })],
};

export const StrokeSizeMButton: Story = {
  args: {
    children: 'Click',
    theme: ButtonTheme.STROKE,
    size: ButtonSize.M,
  },
  decorators: [CreateElementDecorator({ ...layoutStyle })],
};

export const StrokeSizeLButton: Story = {
  args: {
    children: 'Click',
    theme: ButtonTheme.STROKE,
    size: ButtonSize.L,
  },
  decorators: [CreateElementDecorator({ ...layoutStyle })],
};

export const BrightSizeSButton: Story = {
  args: {
    children: 'Click',
    theme: ButtonTheme.BRIGHT,
    size: ButtonSize.S,
  },
  decorators: [CreateElementDecorator({ ...layoutStyle })],
};

export const BrightSizeMButton: Story = {
  args: {
    children: 'Click',
    theme: ButtonTheme.BRIGHT,
    size: ButtonSize.M,
  },
  decorators: [CreateElementDecorator({ ...layoutStyle })],
};

export const BrightSizeLButton: Story = {
  args: {
    children: 'Click',
    theme: ButtonTheme.BRIGHT,
    size: ButtonSize.L,
  },
  decorators: [CreateElementDecorator({ ...layoutStyle })],
};

export const StrokeSquareSizeSButton: Story = {
  args: {
    children: 'C',
    theme: ButtonTheme.STROKE,
    size: ButtonSize.S,
    square: true,
  },
  decorators: [CreateElementDecorator({ ...layoutStyle })],
};

export const StrokeSquareSizeMButton: Story = {
  args: {
    children: 'C',
    theme: ButtonTheme.STROKE,
    size: ButtonSize.M,
    square: true,
  },
  decorators: [CreateElementDecorator({ ...layoutStyle })],
};

export const StrokeSquareSizeLButton: Story = {
  args: {
    children: 'C',
    theme: ButtonTheme.STROKE,
    size: ButtonSize.L,
    square: true,
  },
  decorators: [CreateElementDecorator({ ...layoutStyle })],
};

export const BrightSquareSizeSButton: Story = {
  args: {
    children: 'C',
    theme: ButtonTheme.BRIGHT,
    size: ButtonSize.S,
    square: true,
  },
  decorators: [CreateElementDecorator({ ...layoutStyle })],
};

export const BrightSquareSizeMButton: Story = {
  args: {
    children: 'C',
    theme: ButtonTheme.BRIGHT,
    size: ButtonSize.M,
    square: true,
  },
  decorators: [CreateElementDecorator({ ...layoutStyle })],
};

export const BrightSquareSizeLButton: Story = {
  args: {
    children: 'C',
    theme: ButtonTheme.BRIGHT,
    size: ButtonSize.L,
    square: true,
  },
  decorators: [CreateElementDecorator({ ...layoutStyle })],
};
