import { formatDateTime, formatHour } from '@/helpers/format';

describe('formatDateTime', () => {
  it('returns dash for null value', () => {
    expect(formatDateTime(null)).toBe('-');
  });

  it('formats Date object correctly', () => {
    const date = new Date('2024-01-15T14:30:00Z');
    const result = formatDateTime(date);
    // Indonesian locale: DD/MM/YY, HH.MM
    expect(result).toMatch(/\d{2}\/\d{2}\/\d{2}, \d{2}\.\d{2}/);
  });

  it('formats date in Indonesian locale', () => {
    const date = new Date('2024-01-15T14:30:00Z');
    const result = formatDateTime(date);
    expect(result).toContain('/');
  });
});

describe('formatHour', () => {
  it('formats Date object to HH:mm format', () => {
    const date = new Date('2024-01-15T14:30:00Z');
    const result = formatHour(date);
    expect(result).toMatch(/\d{2}\.\d{2}/);
  });

  it('handles different hours correctly', () => {
    const date = new Date('2024-01-15T09:05:00Z');
    const result = formatHour(date);
    expect(result).toMatch(/\d{2}\.\d{2}/);
  });
});