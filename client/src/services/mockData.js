import { getTodayDateString, addDays } from '../utils/dates';

// Base dates dynamic around runtime
const today = new Date();
const d = (offsetDays) => getTodayDateString(addDays(today, offsetDays));

export const mockSubjects = [
  {
    _id: 'sub-cs-101',
    name: 'Data Structures & Algorithms',
    color: '#6366f1', // Indigo
    examDate: d(12),
  },
  {
    _id: 'sub-cs-102',
    name: 'Database Management Systems',
    color: '#10b981', // Emerald
    examDate: d(19),
  },
  {
    _id: 'sub-cs-103',
    name: 'Computer Networks',
    color: '#f59e0b', // Amber
    examDate: d(27),
  },
];

export const mockTasks = [
  // Day -2 (Completed past)
  {
    _id: 'tsk-01',
    title: 'Review AVL Tree balance factor rotations',
    type: 'study',
    subjectId: 'sub-cs-101',
    topicId: 'top-01',
    dueDate: d(-1),
    scheduledDate: d(-2),
    priority: 'high',
    completed: true,
  },
  {
    _id: 'tsk-02',
    title: 'SQL Normalization 3NF Practice Exercise',
    type: 'assignment',
    subjectId: 'sub-cs-102',
    topicId: 'top-02',
    dueDate: d(-1),
    scheduledDate: d(-2),
    priority: 'medium',
    completed: true,
  },

  // Day -1 (Completed yesterday)
  {
    _id: 'tsk-03',
    title: 'OSI 7-Layer Protocol Model Deep Dive',
    type: 'study',
    subjectId: 'sub-cs-103',
    topicId: 'top-03',
    dueDate: d(0),
    scheduledDate: d(-1),
    priority: 'medium',
    completed: true,
  },
  {
    _id: 'tsk-04',
    title: 'B-Tree & B+ Tree indexing comparison',
    type: 'study',
    subjectId: 'sub-cs-102',
    topicId: 'top-04',
    dueDate: d(1),
    scheduledDate: d(-1),
    priority: 'high',
    completed: true,
  },

  // Today (Day 0) - Active list for dashboard!
  {
    _id: 'tsk-05',
    title: 'Implement Dijkstra shortest path algorithm in Python',
    type: 'assignment',
    subjectId: 'sub-cs-101',
    topicId: 'top-05',
    dueDate: d(1),
    scheduledDate: d(0),
    priority: 'high',
    completed: false,
  },
  {
    _id: 'tsk-06',
    title: 'ACID properties & Transaction Isolation levels review',
    type: 'study',
    subjectId: 'sub-cs-102',
    topicId: 'top-06',
    dueDate: d(2),
    scheduledDate: d(0),
    priority: 'medium',
    completed: true,
  },
  {
    _id: 'tsk-07',
    title: 'TCP 3-Way Handshake & Flow Control Wireshark analysis',
    type: 'study',
    subjectId: 'sub-cs-103',
    topicId: 'top-07',
    dueDate: d(3),
    scheduledDate: d(0),
    priority: 'medium',
    completed: false,
  },
  {
    _id: 'tsk-08',
    title: 'Graph Traversals: BFS vs DFS cycle detection',
    type: 'study',
    subjectId: 'sub-cs-101',
    topicId: 'top-08',
    dueDate: d(4),
    scheduledDate: d(0),
    priority: 'low',
    completed: false,
  },

  // Day +1 (Tomorrow)
  {
    _id: 'tsk-09',
    title: 'ER Diagram to Relational Schema mapping assignment',
    type: 'assignment',
    subjectId: 'sub-cs-102',
    topicId: 'top-09',
    dueDate: d(2),
    scheduledDate: d(1),
    priority: 'high',
    completed: false,
  },
  {
    _id: 'tsk-10',
    title: 'Subnetting and CIDR notation exercises',
    type: 'study',
    subjectId: 'sub-cs-103',
    topicId: 'top-10',
    dueDate: d(3),
    scheduledDate: d(1),
    priority: 'medium',
    completed: false,
  },

  // Day +2
  {
    _id: 'tsk-11',
    title: 'Heap Sort & Priority Queues implementation',
    type: 'study',
    subjectId: 'sub-cs-101',
    topicId: 'top-11',
    dueDate: d(4),
    scheduledDate: d(2),
    priority: 'medium',
    completed: false,
  },
  {
    _id: 'tsk-12',
    title: 'Query Optimization & EXPLAIN plan reading',
    type: 'study',
    subjectId: 'sub-cs-102',
    topicId: 'top-12',
    dueDate: d(5),
    scheduledDate: d(2),
    priority: 'high',
    completed: false,
  },

  // Day +3
  {
    _id: 'tsk-13',
    title: 'DNS Resolution & HTTP/2 vs HTTP/3 protocols',
    type: 'study',
    subjectId: 'sub-cs-103',
    topicId: 'top-13',
    dueDate: d(6),
    scheduledDate: d(3),
    priority: 'low',
    completed: false,
  },
  {
    _id: 'tsk-14',
    title: 'Dynamic Programming: 0/1 Knapsack & Coin Change',
    type: 'assignment',
    subjectId: 'sub-cs-101',
    topicId: 'top-14',
    dueDate: d(5),
    scheduledDate: d(3),
    priority: 'high',
    completed: false,
  },

  // Day +4 to Day +7
  {
    _id: 'tsk-15',
    title: 'NoSQL vs RDBMS trade-off analysis report',
    type: 'assignment',
    subjectId: 'sub-cs-102',
    topicId: 'top-15',
    dueDate: d(7),
    scheduledDate: d(4),
    priority: 'medium',
    completed: false,
  },
  {
    _id: 'tsk-16',
    title: 'Routing Protocols: OSPF vs BGP vector routing',
    type: 'study',
    subjectId: 'sub-cs-103',
    topicId: 'top-16',
    dueDate: d(8),
    scheduledDate: d(5),
    priority: 'medium',
    completed: false,
  },
  {
    _id: 'tsk-17',
    title: 'Trie Data Structure & Autocomplete system design',
    type: 'study',
    subjectId: 'sub-cs-101',
    topicId: 'top-17',
    dueDate: d(8),
    scheduledDate: d(6),
    priority: 'low',
    completed: false,
  },
  {
    _id: 'tsk-18',
    title: 'Database Concurrency: Two-Phase Locking (2PL)',
    type: 'study',
    subjectId: 'sub-cs-102',
    topicId: 'top-18',
    dueDate: d(9),
    scheduledDate: d(7),
    priority: 'high',
    completed: false,
  },

  // Day +8 to Day +14
  {
    _id: 'tsk-19',
    title: 'Network Security: TLS handshake & Symmetric encryption',
    type: 'study',
    subjectId: 'sub-cs-103',
    topicId: 'top-19',
    dueDate: d(11),
    scheduledDate: d(8),
    priority: 'medium',
    completed: false,
  },
  {
    _id: 'tsk-20',
    title: 'Union-Find & Kruskal Minimum Spanning Tree',
    type: 'study',
    subjectId: 'sub-cs-101',
    topicId: 'top-20',
    dueDate: d(11),
    scheduledDate: d(9),
    priority: 'high',
    completed: false,
  },
  {
    _id: 'tsk-21',
    title: 'Midterm Comprehensive Practice Exam (DSA)',
    type: 'exam',
    subjectId: 'sub-cs-101',
    topicId: 'top-21',
    dueDate: d(12),
    scheduledDate: d(12),
    priority: 'high',
    completed: false,
  },
  {
    _id: 'tsk-22',
    title: 'Distributed Transactions & 2PC commit protocol',
    type: 'study',
    subjectId: 'sub-cs-102',
    topicId: 'top-22',
    dueDate: d(14),
    scheduledDate: d(13),
    priority: 'medium',
    completed: false,
  },
  {
    _id: 'tsk-23',
    title: 'Midterm Practice Mock Exam (DBMS)',
    type: 'exam',
    subjectId: 'sub-cs-102',
    topicId: 'top-23',
    dueDate: d(19),
    scheduledDate: d(14),
    priority: 'high',
    completed: false,
  },
  {
    _id: 'tsk-24',
    title: 'Socket Programming Client-Server Lab Submission',
    type: 'assignment',
    subjectId: 'sub-cs-103',
    topicId: 'top-24',
    dueDate: d(14),
    scheduledDate: d(14),
    priority: 'high',
    completed: false,
  },
  {
    _id: 'tsk-25',
    title: 'Computer Networks Comprehensive Exam Preparation',
    type: 'exam',
    subjectId: 'sub-cs-103',
    topicId: 'top-25',
    dueDate: d(27),
    scheduledDate: d(14),
    priority: 'high',
    completed: false,
  },
];

// 3 Weeks of Pomodoro sessions
export const mockSessions = [
  // Week -3
  { _id: 'ses-01', taskId: 'tsk-01', subjectId: 'sub-cs-101', durationMin: 50, date: d(-20) },
  { _id: 'ses-02', taskId: 'tsk-02', subjectId: 'sub-cs-102', durationMin: 25, date: d(-19) },
  { _id: 'ses-03', taskId: 'tsk-03', subjectId: 'sub-cs-103', durationMin: 50, date: d(-18) },
  { _id: 'ses-04', taskId: 'tsk-04', subjectId: 'sub-cs-102', durationMin: 75, date: d(-17) },
  { _id: 'ses-05', taskId: 'tsk-01', subjectId: 'sub-cs-101', durationMin: 50, date: d(-16) },
  { _id: 'ses-06', taskId: 'tsk-03', subjectId: 'sub-cs-103', durationMin: 25, date: d(-15) },

  // Week -2
  { _id: 'ses-07', taskId: 'tsk-01', subjectId: 'sub-cs-101', durationMin: 75, date: d(-14) },
  { _id: 'ses-08', taskId: 'tsk-02', subjectId: 'sub-cs-102', durationMin: 50, date: d(-13) },
  { _id: 'ses-09', taskId: 'tsk-03', subjectId: 'sub-cs-103', durationMin: 50, date: d(-12) },
  { _id: 'ses-10', taskId: 'tsk-04', subjectId: 'sub-cs-102', durationMin: 75, date: d(-11) },
  { _id: 'ses-11', taskId: 'tsk-01', subjectId: 'sub-cs-101', durationMin: 50, date: d(-10) },
  { _id: 'ses-12', taskId: 'tsk-03', subjectId: 'sub-cs-103', durationMin: 50, date: d(-9) },
  { _id: 'ses-13', taskId: 'tsk-02', subjectId: 'sub-cs-102', durationMin: 25, date: d(-8) },

  // Week -1 (Past 7 days)
  { _id: 'ses-14', taskId: 'tsk-01', subjectId: 'sub-cs-101', durationMin: 75, date: d(-6) },
  { _id: 'ses-15', taskId: 'tsk-02', subjectId: 'sub-cs-102', durationMin: 50, date: d(-5) },
  { _id: 'ses-16', taskId: 'tsk-03', subjectId: 'sub-cs-103', durationMin: 50, date: d(-4) },
  { _id: 'ses-17', taskId: 'tsk-04', subjectId: 'sub-cs-102', durationMin: 100, date: d(-3) },
  { _id: 'ses-18', taskId: 'tsk-01', subjectId: 'sub-cs-101', durationMin: 75, date: d(-2) },
  { _id: 'ses-19', taskId: 'tsk-04', subjectId: 'sub-cs-102', durationMin: 50, date: d(-1) },
  { _id: 'ses-20', taskId: 'tsk-06', subjectId: 'sub-cs-102', durationMin: 50, date: d(0) },
];

// Precomputed analytics summary matching API contract
export function getMockAnalyticsSummary() {
  return {
    hoursPerSubject: [
      { subjectId: 'sub-cs-101', name: 'Data Structures & Algorithms', color: '#6366f1', hours: 14.5 },
      { subjectId: 'sub-cs-102', name: 'Database Management Systems', color: '#10b981', hours: 11.0 },
      { subjectId: 'sub-cs-103', name: 'Computer Networks', color: '#f59e0b', hours: 7.5 },
    ],
    weeklyConsistency: [
      { date: d(-6), minutes: 75, day: 'Mon' },
      { date: d(-5), minutes: 50, day: 'Tue' },
      { date: d(-4), minutes: 50, day: 'Wed' },
      { date: d(-3), minutes: 100, day: 'Thu' },
      { date: d(-2), minutes: 75, day: 'Fri' },
      { date: d(-1), minutes: 50, day: 'Sat' },
      { date: d(0), minutes: 50, day: 'Sun' },
    ],
    syllabusCompletion: [
      { subjectId: 'sub-cs-101', name: 'Data Structures & Algorithms', color: '#6366f1', percent: 78 },
      { subjectId: 'sub-cs-102', name: 'Database Management Systems', color: '#10b981', percent: 64 },
      { subjectId: 'sub-cs-103', name: 'Computer Networks', color: '#f59e0b', percent: 45 },
    ],
    completionRate: 82, // percentage
    streak: {
      current: 7,
      longest: 12,
    },
  };
}

