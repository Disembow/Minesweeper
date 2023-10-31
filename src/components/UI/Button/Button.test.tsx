import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';
import { ButtonSize, ButtonTheme } from './types/ButtonTypes';

describe('test Button component', () => {
  test('should render a button component', () => {
    render(<Button>Test</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  test('should have classes', () => {
    render(
      <Button
        className={'test_button'}
        theme={ButtonTheme.BRIGHT}
        size={ButtonSize.S}
        square={true}
      >
        Test
      </Button>,
    );
    const button = screen.getByRole('button');

    expect(button).toHaveTextContent('Test');
    expect(button).toHaveClass('Button');
    expect(button).toHaveClass('square');
    expect(button).toHaveClass('size_s');
    expect(button).toHaveClass('bright');
    expect(button).toHaveClass('test_button');
    expect(button).not.toHaveClass('strange_class');
  });
});
