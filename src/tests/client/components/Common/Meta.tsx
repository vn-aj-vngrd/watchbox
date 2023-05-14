import { render, waitFor } from '@testing-library/react';
import Meta from '../../../../components/Common/Meta';

describe('Meta', () => {
  it('renders with default title', async () => {
    render(<Meta />);
    await waitFor(() => expect(document.title).toBe('WatchBox'));
  });

  it('renders with custom title', async () => {
    render(<Meta title="Custom Title" />);
    await waitFor(() => expect(document.title).toBe('Custom Title'));
  });
});
