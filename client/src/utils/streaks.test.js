import { describe, it, expect } from 'vitest';
import { calculateStreak } from './streaks';

describe('Streak Calculation Utility', () => {
  it('returns 0 current and longest for empty session list', () => {
    expect(calculateStreak([])).toEqual({ current: 0, longest: 0 });
    expect(calculateStreak(null)).toEqual({ current: 0, longest: 0 });
  });

  it('handles multiple sessions on the same day without overcounting', () => {
    const refDate = '2026-11-05';
    const sessions = [
      { date: '2026-11-05', durationMin: 25 },
      { date: '2026-11-05', durationMin: 50 },
      { date: '2026-11-04', durationMin: 25 },
    ];
    const result = calculateStreak(sessions, refDate);
    expect(result.current).toBe(2);
    expect(result.longest).toBe(2);
  });

  it('correctly handles the "today not yet done" grace case', () => {
    const refDate = '2026-11-05';
    // User has sessions on 11-04, 11-03, 11-02, but NOT 11-05 (today)
    const sessions = [
      { date: '2026-11-04' },
      { date: '2026-11-03' },
      { date: '2026-11-02' },
    ];
    const result = calculateStreak(sessions, refDate);
    // Grace case should preserve the 3-day streak from yesterday!
    expect(result.current).toBe(3);
    expect(result.longest).toBe(3);
  });

  it('breaks streak when a day has zero sessions', () => {
    const refDate = '2026-11-05';
    // Active on 11-05 and 11-04, skipped 11-03, active 11-02 and 11-01
    const sessions = [
      { date: '2026-11-05' },
      { date: '2026-11-04' },
      // 2026-11-03 missing
      { date: '2026-11-02' },
      { date: '2026-11-01' },
      { date: '2026-10-31' },
    ];
    const result = calculateStreak(sessions, refDate);
    expect(result.current).toBe(2);
    // Longest should be 3 from the past (10-31 to 11-02)
    expect(result.longest).toBe(3);
  });

  it('resets current streak to 0 if neither today nor yesterday had any session', () => {
    const refDate = '2026-11-05';
    // Last active day was 2 days ago (11-03)
    const sessions = [
      { date: '2026-11-03' },
      { date: '2026-11-02' },
    ];
    const result = calculateStreak(sessions, refDate);
    expect(result.current).toBe(0);
    expect(result.longest).toBe(2);
  });

  it('handles timezone boundaries and ISO timestamps properly', () => {
    const refDate = '2026-11-05T00:00:00.000Z';
    const sessions = [
      { createdAt: '2026-11-05T14:30:00.000Z' },
      { createdAt: '2026-11-04T22:15:00.000Z' },
      { createdAt: '2026-11-03T09:00:00.000Z' },
    ];
    const result = calculateStreak(sessions, refDate);
    expect(result.current).toBe(3);
  });

  it('ignores sessions with 0 or negative durationMin', () => {
    const refDate = '2026-11-05';
    const sessions = [
      { date: '2026-11-05', durationMin: 0 },
      { date: '2026-11-04', durationMin: 25 },
    ];
    const result = calculateStreak(sessions, refDate);
    // 11-05 ignored because duration is 0, grace case picks up 11-04
    expect(result.current).toBe(1);
  });
});
