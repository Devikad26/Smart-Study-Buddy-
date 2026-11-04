/**
 * Pure function to calculate study streaks from session records.
 *
 * Rules:
 * - A day is counted as active if at least 1 session was logged (or minutes > 0).
 * - Timezone boundaries: Dates are normalized to calendar date 'YYYY-MM-DD' (using ISO representation).
 * - "Today not yet done" grace case: If today has 0 sessions, but yesterday was active,
 *   the streak is maintained (grace period).
 * - A day with zero sessions before yesterday resets the current streak.
 * - Longest streak is the maximum consecutive run in history.
 */

export function normalizeDateStr(dateInput) {
  if (!dateInput) return '';
  if (typeof dateInput === 'string') {
    const match = dateInput.match(/^(\d{4}-\d{2}-\d{2})/);
    if (match) return match[1];
  }
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return '';
  return d.toISOString().slice(0, 10);
}

export function shiftDate(dateStr, offsetDays) {
  const [y, m, d] = dateStr.split('-').map(Number);
  // Use Date.UTC to guarantee no daylight savings or local timezone shifts
  const utcDate = new Date(Date.UTC(y, m - 1, d + offsetDays));
  return utcDate.toISOString().slice(0, 10);
}

export function calculateStreak(sessions = [], referenceDate = new Date()) {
  if (!Array.isArray(sessions) || sessions.length === 0) {
    return { current: 0, longest: 0 };
  }

  // Extract unique active days (YYYY-MM-DD)
  const activeDaysSet = new Set();
  sessions.forEach((s) => {
    const rawDate = typeof s === 'string' ? s : s?.date || s?.createdAt;
    const normalized = normalizeDateStr(rawDate);
    if (normalized) {
      // If session object has durationMin, ensure it's > 0
      if (typeof s === 'object' && s.durationMin !== undefined && Number(s.durationMin) <= 0) {
        return;
      }
      activeDaysSet.add(normalized);
    }
  });

  if (activeDaysSet.size === 0) {
    return { current: 0, longest: 0 };
  }

  const todayStr = normalizeDateStr(referenceDate);
  const yesterdayStr = shiftDate(todayStr, -1);

  // 1. Calculate Current Streak with Grace Case
  let currentStreak = 0;
  let checkDate = '';

  const hasDoneToday = activeDaysSet.has(todayStr);
  const hasDoneYesterday = activeDaysSet.has(yesterdayStr);

  if (hasDoneToday) {
    // Started counting from today backwards
    checkDate = todayStr;
    while (activeDaysSet.has(checkDate)) {
      currentStreak++;
      checkDate = shiftDate(checkDate, -1);
    }
  } else if (hasDoneYesterday) {
    // "Today not yet done" Grace Case: Yesterday was done, streak is preserved!
    checkDate = yesterdayStr;
    while (activeDaysSet.has(checkDate)) {
      currentStreak++;
      checkDate = shiftDate(checkDate, -1);
    }
  } else {
    // Neither today nor yesterday had any session
    currentStreak = 0;
  }

  // 2. Calculate Longest Streak Across Entire History
  const sortedDates = Array.from(activeDaysSet).sort();
  let longestStreak = 0;
  let currentRun = 0;
  let prevDate = null;

  for (let i = 0; i < sortedDates.length; i++) {
    const currentDate = sortedDates[i];
    if (!prevDate) {
      currentRun = 1;
    } else {
      const expectedNext = shiftDate(prevDate, 1);
      if (currentDate === expectedNext) {
        currentRun++;
      } else {
        currentRun = 1;
      }
    }
    if (currentRun > longestStreak) {
      longestStreak = currentRun;
    }
    prevDate = currentDate;
  }

  return {
    current: currentStreak,
    longest: Math.max(longestStreak, currentStreak),
  };
}
