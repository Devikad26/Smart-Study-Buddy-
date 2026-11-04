/**
 * Date and time helper utilities for StudyBuddy
 */

export function getTodayDateString(refDate = new Date()) {
  const d = new Date(refDate);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatReadableDate(dateInput) {
  if (!dateInput) return '';
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return String(dateInput);
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

export function getGreetingTime(date = new Date()) {
  const hour = date.getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export function getDaysRemaining(targetDateInput, fromDate = new Date()) {
  if (!targetDateInput) return null;
  const target = new Date(targetDateInput);
  const from = new Date(fromDate);
  // Normalize both to start of day
  target.setHours(0, 0, 0, 0);
  from.setHours(0, 0, 0, 0);
  const diffMs = target.getTime() - from.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

export function getCountdownBadge(targetDateInput, fromDate = new Date()) {
  const days = getDaysRemaining(targetDateInput, fromDate);
  if (days === null) return { text: 'No date', color: 'slate' };
  if (days < 0) return { text: `${Math.abs(days)}d ago`, color: 'rose' };
  if (days === 0) return { text: 'Today', color: 'rose' };
  if (days === 1) return { text: 'Tomorrow', color: 'amber' };
  if (days <= 7) return { text: `${days} days left`, color: 'amber' };
  return { text: `${days} days left`, color: 'indigo' };
}

export function formatMinutesToHours(minutes = 0) {
  if (!minutes || minutes <= 0) return '0m';
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hrs > 0 && mins > 0) return `${hrs}h ${mins}m`;
  if (hrs > 0) return `${hrs}h`;
  return `${mins}m`;
}

export function formatTimerSeconds(totalSeconds = 0) {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const mins = Math.floor(safeSeconds / 60);
  const secs = safeSeconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export function addDays(dateInput, numDays) {
  const d = new Date(dateInput);
  d.setDate(d.getDate() + numDays);
  return d;
}

