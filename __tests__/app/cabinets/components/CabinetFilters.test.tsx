import { render, screen } from '@testing-library/react';
import { CabinetFilters } from '@/app/cabinets/components/CabinetFilters';
import type { CabinetListParams } from '@/app/cabinets/types/cabinet';

const defaultParams: CabinetListParams = {
  q: '',
  status: 'ALL',
  sort: 'swaps_desc',
  page: 1,
  pageSize: 10,
};

describe('CabinetFilters', () => {
  it('renders search input with default value', () => {
    render(<CabinetFilters params={defaultParams} />);
    const input = screen.getByPlaceholderText('Code or branch');
    expect(input).toHaveValue('');
  });

  it('renders search input with custom value', () => {
    const params = { ...defaultParams, q: 'CAB-001' };
    render(<CabinetFilters params={params} />);
    const input = screen.getByPlaceholderText('Code or branch');
    expect(input).toHaveValue('CAB-001');
  });

  it('renders status select with all options', () => {
    render(<CabinetFilters params={defaultParams} />);
    expect(screen.getByRole('option', { name: 'All status' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'ONLINE' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'OFFLINE' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'MAINTENANCE' })).toBeInTheDocument();
  });

  it('renders status select with selected value', () => {
    const params = { ...defaultParams, status: 'ONLINE' };
    render(<CabinetFilters params={params} />);
    expect(screen.getByDisplayValue('ONLINE')).toBeInTheDocument();
  });

  it('renders sort select with all options', () => {
    render(<CabinetFilters params={defaultParams} />);
    expect(screen.getByRole('option', { name: 'Swaps: high to low' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Swaps: low to high' })).toBeInTheDocument();
  });

  it('renders sort select with selected value', () => {
    const params = { ...defaultParams, sort: 'swaps_asc' };
    render(<CabinetFilters params={params} />);
    const select = screen.getByRole('combobox', { name: 'Sort' });
    expect(select).toHaveValue('swaps_asc');
  });

  it('renders Apply filters button', () => {
    render(<CabinetFilters params={defaultParams} />);
    expect(screen.getByRole('button', { name: 'Apply filters' })).toBeInTheDocument();
  });

  it('form has GET method', () => {
    const { container } = render(<CabinetFilters params={defaultParams} />);
    const form = container.querySelector('form');
    expect(form).toHaveAttribute('method', 'GET');
  });
});