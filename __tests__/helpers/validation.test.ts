import { cabinetListSchema, cabinetIdSchema } from '@/helpers/validation';

describe('cabinetListSchema', () => {
  it('parses valid input with all defaults', () => {
    const result = cabinetListSchema.safeParse({});
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual({
        q: '',
        status: 'ALL',
        sort: 'swaps_desc',
        page: 1,
        pageSize: 10,
      });
    }
  });

  it('parses valid input with custom values', () => {
    const result = cabinetListSchema.safeParse({
      q: 'CAB-001',
      status: 'ONLINE',
      sort: 'swaps_asc',
      page: 2,
      pageSize: 20,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual({
        q: 'CAB-001',
        status: 'ONLINE',
        sort: 'swaps_asc',
        page: 2,
        pageSize: 20,
      });
    }
  });

  it('trims whitespace from q', () => {
    const result = cabinetListSchema.safeParse({ q: '  CAB-001  ' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.q).toBe('CAB-001');
    }
  });

  it('rejects q longer than 100 characters', () => {
    const result = cabinetListSchema.safeParse({ q: 'a'.repeat(101) });
    expect(result.success).toBe(false);
  });

  it('rejects invalid status', () => {
    const result = cabinetListSchema.safeParse({ status: 'INVALID' });
    expect(result.success).toBe(false);
  });

  it('rejects invalid sort', () => {
    const result = cabinetListSchema.safeParse({ sort: 'invalid' });
    expect(result.success).toBe(false);
  });

  it('rejects page less than 1', () => {
    const result = cabinetListSchema.safeParse({ page: 0 });
    expect(result.success).toBe(false);
  });

  it('rejects page greater than 10000', () => {
    const result = cabinetListSchema.safeParse({ page: 10001 });
    expect(result.success).toBe(false);
  });

  it('rejects pageSize less than 1', () => {
    const result = cabinetListSchema.safeParse({ pageSize: 0 });
    expect(result.success).toBe(false);
  });

  it('rejects pageSize greater than 50', () => {
    const result = cabinetListSchema.safeParse({ pageSize: 51 });
    expect(result.success).toBe(false);
  });

  it('coerces string numbers to integers', () => {
    const result = cabinetListSchema.safeParse({ page: '2', pageSize: '15' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.page).toBe(2);
      expect(result.data.pageSize).toBe(15);
    }
  });
});

describe('cabinetIdSchema', () => {
  it('accepts valid UUID', () => {
    const result = cabinetIdSchema.safeParse('550e8400-e29b-41d4-a716-446655440000');
    expect(result.success).toBe(true);
  });

  it('rejects invalid UUID', () => {
    const result = cabinetIdSchema.safeParse('not-a-uuid');
    expect(result.success).toBe(false);
  });

  it('rejects empty string', () => {
    const result = cabinetIdSchema.safeParse('');
    expect(result.success).toBe(false);
  });
});