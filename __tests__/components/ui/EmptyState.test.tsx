import { render, screen } from '@testing-library/react';
import { EmptyState } from '@/components/ui/EmptyState';

describe('EmptyState', () => {
  it('renders title', () => {
    render(<EmptyState title="No data found" />);
    expect(screen.getByText('No data found')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<EmptyState title="No data" description="Try changing filters" />);
    expect(screen.getByText('Try changing filters')).toBeInTheDocument();
  });

  it('does not render description when not provided', () => {
    render(<EmptyState title="No data" />);
    expect(screen.queryByText('Try changing filters')).not.toBeInTheDocument();
  });

  it('applies correct base classes', () => {
    render(<EmptyState title="Test" />);
    const container = screen.getByText('Test').parentElement;
    expect(container).toHaveClass('p-10');
    expect(container).toHaveClass('text-center');
  });

  it('applies correct title classes', () => {
    render(<EmptyState title="Test" />);
    expect(screen.getByText('Test')).toHaveClass('font-medium');
    expect(screen.getByText('Test')).toHaveClass('text-slate-900');
  });

  it('applies correct description classes', () => {
    render(<EmptyState title="Test" description="Description" />);
    expect(screen.getByText('Description')).toHaveClass('mt-1');
    expect(screen.getByText('Description')).toHaveClass('text-sm');
    expect(screen.getByText('Description')).toHaveClass('text-slate-500');
  });
});