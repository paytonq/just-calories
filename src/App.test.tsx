// Copyright 2022 Payton Quinn
// SPDX-License-Identifier: GPL-3.0-only

import { render } from '@testing-library/react';
import App from './App';

test('renders without crashing', () => {
  const { baseElement } = render(<App />);
  expect(baseElement).toBeDefined();
});
