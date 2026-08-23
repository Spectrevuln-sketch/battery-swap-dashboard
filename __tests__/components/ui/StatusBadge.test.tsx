import { render, screen } from '@testing-library/react';
import { StatusBadge } from '@/components/ui/StatusBadge';

describe('StatusBadge', () => {
  it('renders ONLINE status with correct classes', () => {
    render(<StatusBadge status="ONLINE" />);
    const badge = screen.getByText('ONLINE');
    expect(badge).toHaveClass('bg-emerald-50');
    expect(badge).toHaveClass('text-emerald-700');
    expect(badge).toHaveClass('ring-emerald-600/20');
  });

  it('renders OFFLINE status with correct classes', () => {
    render(<StatusBadge status="OFFLINE" />);
    const badge = screen.getByText('OFFLINE');
    expect(badge).toHaveClass('bg-red-50');
    expect(badge).toHaveClass('text-red-700');
    expect(badge).toHaveClass('ring-red-600/20');
  });

  it('renders MAINTENANCE status with correct classes', () => {
    render(<StatusBadge status="MAINTENANCE" />);
    const badge = screen.getByText('MAINTENANCE');
    expect(badge).toHaveClass('bg-amber-50');
    expect(badge).toHaveClass('text-amber-700');
    expect(badge).toHaveClass('ring-amber-600/20');
  });

  it('applies base styling classes', () => {
    render(<StatusBadge status="ONLINE" />);
    const badge = screen.getByText('ONLINE');
    expect(badge).toHaveClass('inline-flex');
    expect(badge).toHaveClass('rounded-full');
    expect(badge).toHaveClass('px-2.5');
    expect(badge).toHaveClass('py-1');
    expect(badge).toHaveClass('text-xs');
    expect(badge).toHaveClass('font-medium');
    expect(badge).toHaveClass('ring-1');
    expect(badge).toHaveClass('ring-inset');
  });
});