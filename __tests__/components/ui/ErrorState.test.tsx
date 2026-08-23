import { render, screen } from '@testing-library/react';
import { ErrorState } from '@/components/ui/ErrorState';

describe('ErrorState', () => {
  it('renders error message', () => {
    render(<ErrorState message="Something went wrong" />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('applies correct base classes', () => {
    const { container } = render(<ErrorState message="Error" />);
    const div = container.querySelector('div');
    expect(div).toHaveClass('rounded-xl');
    expect(div).toHaveClass('border');
    expect(div).toHaveClass('border-red-200');
    expect(div).toHaveClass('bg-red-50');
    expect(div).toHaveClass('p-6');
    expect(div).toHaveClass('text-sm');
    expect(div).toHaveClass('text-red-800');
  });
});