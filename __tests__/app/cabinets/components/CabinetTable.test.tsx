import { render, screen } from '@testing-library/react';
import { CabinetTable } from '@/app/cabinets/components/CabinetTable';
import type { CabinetListRow } from '@/app/cabinets/types/cabinet';

const mockRows: CabinetListRow[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    code: 'CAB-001',
    branch_name: 'Branch A',
    status: 'ONLINE',
    last_heartbeat: new Date('2024-01-15T14:30:00Z'),
    filled_slots: 8,
    total_slots: 12,
    swaps_24h: 45,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    code: 'CAB-002',
    branch_name: 'Branch B',
    status: 'OFFLINE',
    last_heartbeat: null,
    filled_slots: 0,
    total_slots: 12,
    swaps_24h: 0,
  },
];

describe('CabinetTable', () => {
  it('renders EmptyState when rows array is empty', () => {
    render(<CabinetTable rows={[]} />);
    expect(screen.getByText('Tidak ada cabinet yang cocok.')).toBeInTheDocument();
    expect(screen.getByText('Coba ubah pencarian atau filter yang dipilih.')).toBeInTheDocument();
  });

  it('renders table with rows', () => {
    render(<CabinetTable rows={mockRows} />);
    expect(screen.getByText('CAB-001')).toBeInTheDocument();
    expect(screen.getByText('CAB-002')).toBeInTheDocument();
    expect(screen.getByText('Branch A')).toBeInTheDocument();
    expect(screen.getByText('Branch B')).toBeInTheDocument();
  });

  it('renders table headers', () => {
    render(<CabinetTable rows={mockRows} />);
    expect(screen.getByText('Cabinet')).toBeInTheDocument();
    expect(screen.getByText('Branch')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Slots')).toBeInTheDocument();
    expect(screen.getByText('Swaps 24h')).toBeInTheDocument();
    expect(screen.getByText('Heartbeat')).toBeInTheDocument();
  });

  it('renders slot information correctly', () => {
    render(<CabinetTable rows={mockRows} />);
    expect(screen.getByText('8/12')).toBeInTheDocument();
    expect(screen.getByText('0/12')).toBeInTheDocument();
  });

  it('renders swaps_24h correctly', () => {
    render(<CabinetTable rows={mockRows} />);
    expect(screen.getByText('45')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('links cabinet code to detail page', () => {
    render(<CabinetTable rows={mockRows} />);
    const link = screen.getByRole('link', { name: 'CAB-001' });
    expect(link).toHaveAttribute('href', '/cabinets/550e8400-e29b-41d4-a716-446655440001');
  });

  it('formats heartbeat date correctly', () => {
    render(<CabinetTable rows={mockRows} />);
    expect(screen.getByText(/15\/01\/24/)).toBeInTheDocument();
  });

  it('shows dash for null heartbeat', () => {
    render(<CabinetTable rows={mockRows} />);
    expect(screen.getByText('-')).toBeInTheDocument();
  });
});