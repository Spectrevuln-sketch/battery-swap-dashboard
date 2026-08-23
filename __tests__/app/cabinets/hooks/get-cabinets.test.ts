import { getCabinets } from '@/app/cabinets/hooks/get-cabinets';
import { database } from '@/config/database';
import type { CabinetListParams, CabinetListRow, CabinetListResult } from '@/app/cabinets/types/cabinet';

jest.mock('@/config/database');

const mockDatabase = database as jest.Mocked<typeof database>;

describe('getCabinets', () => {
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

  const defaultParams: CabinetListParams = {
    q: '',
    status: 'ALL',
    sort: 'swaps_desc',
    page: 1,
    pageSize: 10,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns paginated results with correct structure', async () => {
    mockDatabase.query
      .mockResolvedValueOnce({ rows: [{ count: 2 }] })
      .mockResolvedValueOnce({ rows: mockRows });

    const result = await getCabinets(defaultParams);

    expect(result).toEqual({
      rows: mockRows,
      total: 2,
      totalPages: 1,
      page: 1,
      pageSize: 10,
    });
  });

  it('calculates totalPages correctly', async () => {
    mockDatabase.query
      .mockResolvedValueOnce({ rows: [{ count: 25 }] })
      .mockResolvedValueOnce({ rows: mockRows.slice(0, 1) });

    const result = await getCabinets({ ...defaultParams, pageSize: 10 });

    expect(result.totalPages).toBe(3);
  });

  it('uses DESC sort by default', async () => {
    mockDatabase.query
      .mockResolvedValueOnce({ rows: [{ count: 0 }] })
      .mockResolvedValueOnce({ rows: [] });

    await getCabinets(defaultParams);

    const secondCall = mockDatabase.query.mock.calls[1];
    expect(secondCall[0]).toContain('ORDER BY swaps_24h DESC');
  });

  it('uses ASC sort when swaps_asc', async () => {
    mockDatabase.query
      .mockResolvedValueOnce({ rows: [{ count: 0 }] })
      .mockResolvedValueOnce({ rows: [] });

    await getCabinets({ ...defaultParams, sort: 'swaps_asc' });

    const secondCall = mockDatabase.query.mock.calls[1];
    expect(secondCall[0]).toContain('ORDER BY swaps_24h ASC');
  });

  it('calculates offset correctly', async () => {
    mockDatabase.query
      .mockResolvedValueOnce({ rows: [{ count: 0 }] })
      .mockResolvedValueOnce({ rows: [] });

    await getCabinets({ ...defaultParams, page: 3, pageSize: 10 });

    const secondCall = mockDatabase.query.mock.calls[1];
    expect(secondCall[1]).toEqual(['', 'ALL', 10, 20]);
  });

  it('passes search query to both queries', async () => {
    mockDatabase.query
      .mockResolvedValueOnce({ rows: [{ count: 1 }] })
      .mockResolvedValueOnce({ rows: [mockRows[0]] });

    await getCabinets({ ...defaultParams, q: 'CAB-001' });

    expect(mockDatabase.query).toHaveBeenCalledTimes(2);
    expect(mockDatabase.query.mock.calls[0][1]).toEqual(['CAB-001', 'ALL']);
    expect(mockDatabase.query.mock.calls[1][1]).toEqual(['CAB-001', 'ALL', 10, 0]);
  });

  it('passes status filter to both queries', async () => {
    mockDatabase.query
      .mockResolvedValueOnce({ rows: [{ count: 1 }] })
      .mockResolvedValueOnce({ rows: [mockRows[0]] });

    await getCabinets({ ...defaultParams, status: 'ONLINE' });

    expect(mockDatabase.query.mock.calls[0][1]).toEqual(['', 'ONLINE']);
    expect(mockDatabase.query.mock.calls[1][1]).toEqual(['', 'ONLINE', 10, 0]);
  });

  it('handles empty results', async () => {
    mockDatabase.query
      .mockResolvedValueOnce({ rows: [{ count: 0 }] })
      .mockResolvedValueOnce({ rows: [] });

    const result = await getCabinets(defaultParams);

    expect(result.rows).toEqual([]);
    expect(result.total).toBe(0);
    expect(result.totalPages).toBe(1);
  });

  it('handles null count from database', async () => {
    mockDatabase.query
      .mockResolvedValueOnce({ rows: [] })
      .mockResolvedValueOnce({ rows: [] });

    const result = await getCabinets(defaultParams);

    expect(result.total).toBe(0);
    expect(result.totalPages).toBe(1);
  });

  it('returns minimum 1 totalPages', async () => {
    mockDatabase.query
      .mockResolvedValueOnce({ rows: [{ count: 0 }] })
      .mockResolvedValueOnce({ rows: [] });

    const result = await getCabinets(defaultParams);

    expect(result.totalPages).toBe(1);
  });
});