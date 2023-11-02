import { describe, expect, test } from 'vitest';
import { screen } from '@testing-library/react';
import Overlay from './Overlay';
import { renderWithRedux } from 'app/testing/helpers/renderWithRedux ';

describe('Overlay', () => {
  test('should render', () => {
    renderWithRedux(<Overlay />);
    const overlay = screen.getByTestId('overlay');
    expect(overlay).toBeInTheDocument();
  });
});
