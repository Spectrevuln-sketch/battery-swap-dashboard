import { render, screen } from '@testing-library/react';
import { CabinetPagination } from '@/app/cabinets/components/CabinetPagination';
import type { CabinetListParams, CabinetListResult } from '@/app/cabinets/types/cabinet';

const defaultParams: CabinetListParams = {
  q: '',
  status: 'ALL',
  sort: 'swaps_desc',
  page: 1,
  pageSize: 10,
};

const defaultResult: CabinetListResult = {
  rows: [],
  total: 25,
  totalPages: 3,
  page: 1,
  pageSize: 10,
};

describe('CabinetPagination', () => {
  it('renders page info', () => {
    render(<CabinetPagination params={defaultParams} result={defaultResult} />);
    expect(screen.getByText('Page 1 of 3')).toBeInTheDocument();
  });

  it('does not show Previous button on first page', () => {
    render(<CabinetPagination params={defaultParams} result={defaultResult} />);
    expect(screen.queryByText('Previous')).not.toBeInTheDocument();
  });

  it('shows Next button when not on last page', () => {
    render(<CabinetPagination params={defaultParams} result={defaultResult} />);
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('shows Previous button when not on first page', () => {
    const result = { ...defaultResult, page: 2 };
    render(<CabinetPagination params={defaultParams} result={result} />);
    expect(screen.getByText('Previous')).toBeInTheDocument();
  });

  it('does not show Next button on last page', () => {
    const result = { ...defaultResult, page: 3 };
    render(<CabinetPagination params={defaultParams} result={result} />);
    expect(screen.queryByText('Next')).not.toBeInTheDocument();
  });

  it('builds correct URL for next page with default params', () => {
    const result = { ...defaultResult, page: 1 };
    render(<CabinetPagination params={defaultParams} result={result} />);
    const nextLink = screen.getByRole('link', { name: 'Next' });
    expect(nextLink).toHaveAttribute('href', '/cabinets?page=2');
  });

  it('builds correct URL with search query', () => {
    const params = { ...defaultParams, q: 'CAB-001' };
    const result = { ...defaultResult, page: 1 };
    render(<CabinetPagination params={params} result={result} />);
    const nextLink = screen.getByRole('link', { name: 'Next' });
    expect(nextLink).toHaveAttribute('href', '/cabinets?q=CAB-001&page=2');
  });

  it('builds correct URL with status filter', () => {
    const params = { ...defaultParams, status: 'ONLINE' };
    const result = { ...defaultResult, page: 1 };
    render(<CabinetPagination params={params} result={result} />);
    const nextLink = screen.getByRole('link', { name: 'Next' });
    expect(nextLink).toHaveAttribute('href', '/cabinets?status=ONLINE&page=2');
  });

  it('builds correct URL with sort option', () => {
    const params = { ...defaultParams, sort: 'swaps_asc' };
    const result = { ...defaultResult, page: 1 };
    render(<CabinetPagination params={params} result={result} />);
    const nextLink = screen.getByRole('link', { name: 'Next' });
    expect(nextLink).toHaveAttribute('href', '/cabinets?sort=swaps_asc&page=2');
  });

  it('builds correct URL with all params', () => {
    const params = { ...defaultParams, q: 'test', status: 'OFFLINE', sort: 'swaps_asc', page: 2 };
    const result = { ...defaultResult, page: 2 };
    render(<CabinetPagination params={params} result={result} />);
    const prevLink = screen.getByRole('link', { name: 'Previous' });
    expect(prevLink).toHaveAttribute('href', '/cabinets?q=test&status=OFFLINE&sort=swaps_asc');
  });
});