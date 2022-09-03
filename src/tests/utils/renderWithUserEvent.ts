import { ReactElement } from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';

export function renderWithUserEvent(reactNode: ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(reactNode),
  };
}
