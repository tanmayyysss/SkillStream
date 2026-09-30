import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { demoEnrollments, starterNotifications, starterPayments } from '../data/content';

const STORAGE_KEY = 'skillstream-state-v1';
const AppContext = createContext(null);

const demoStudent = {
  name: 'XYZ',
  username: 'xyz',
  email: 'xyz@gmail.com',
  phone: '9876543210',
  password: 'skillstream',
  role: 'student',
  plan: 'Pro',
  planRenews: 'Jul 21, 2026',
};

const emptyGoals = {
  lessonsDone: 0,
  lessonsTarget: 5,
  watchMins: 0,
  watchTarget: 60,
  exercisesDone: 0,
  exercisesTarget: 5,
};

const demoGoals = {
  lessonsDone: 3,
  lessonsTarget: 5,
  lessonDisplay: 65,
  watchMins: 24,
  watchTarget: 60,
  watchDisplay: 40,
  exercisesDone: 4,
  exercisesTarget: 5,
  exerciseDisplay: 80,
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

const initial = {
  user: null,
  enrollments: [],
  notifications: starterNotifications,
  payments: starterPayments,
  goals: emptyGoals,
  streak: 16,
};

export function AppStateProvider({ children }) {
  const [state, setState] = useState(() => loadState() || initial);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const api = useMemo(() => {
    const signIn = ({ username, password, role = 'student' }) => {
      const name = (username || '').trim();
      if (!name || !password) {
        return { ok: false, error: 'Enter a username and password.' };
      }
      if (role === 'admin') {
        setState((prev) => ({
          ...prev,
          user: {
            name: name === 'admin' ? 'Admin' : name,
            username: name,
            email: `${name.toLowerCase()}@skillstream.com`,
            phone: '',
            password,
            role: 'admin',
            plan: 'Admin',
          },
        }));
        return { ok: true, to: '/admin' };
      }
      const isDemo = name.toLowerCase() === 'xyz';
      setState((prev) => {
        const sameUser = prev.user?.username?.toLowerCase() === name.toLowerCase();
        return {
          ...prev,
          user: {
            ...demoStudent,
            name: isDemo ? 'XYZ' : name,
            username: name,
            email: isDemo ? demoStudent.email : `${name.toLowerCase()}@gmail.com`,
            password,
            role: 'student',
            plan: isDemo ? 'Pro' : sameUser ? prev.user.plan : 'Free',
            planRenews: isDemo ? demoStudent.planRenews : sameUser ? prev.user.planRenews : '',
          },
          enrollments: isDemo ? demoEnrollments : sameUser ? prev.enrollments : [],
          goals: isDemo ? demoGoals : sameUser ? prev.goals : emptyGoals,
          streak: isDemo ? 16 : prev.streak || 1,
        };
      });
      return { ok: true, to: '/app' };
    };

    const signInDemo = () => signIn({ username: 'xyz', password: 'skillstream' });

    const signUp = ({ username, email, password }) => {
      const name = (username || '').trim();
      if (!name || !email || !password) {
        return { ok: false, error: 'Fill in username, email, and password.' };
      }
      setState((prev) => ({
        ...prev,
        user: {
          name,
          username: name,
          email,
          phone: '',
          password,
          role: 'student',
          plan: 'Free',
          planRenews: '',
        },
        enrollments: [],
        goals: emptyGoals,
        streak: 1,
      }));
      return { ok: true, to: '/app' };
    };

    const signOut = () => {
      setState((prev) => ({ ...prev, user: null }));
    };

    const deleteAccount = () => {
      setState({
        ...initial,
        notifications: starterNotifications,
        payments: starterPayments,
      });
    };

    const updateProfile = (patch) => {
      setState((prev) => ({
        ...prev,
        user: prev.user ? { ...prev.user, ...patch } : prev.user,
      }));
    };

    const enroll = (courseId, payment) => {
      setState((prev) => {
        const exists = prev.enrollments.some((item) => item.courseId === courseId);
        const enrollments = exists
          ? prev.enrollments
          : [...prev.enrollments, { courseId, lessonIndex: 0, seconds: 0, completed: [] }];
        const payments = payment
          ? [
              {
                id: `pay-${Date.now()}`,
                date: new Date().toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                }),
                description: payment.description,
                amount: payment.amount,
                status: 'Paid',
              },
              ...prev.payments,
            ]
          : prev.payments;
        return { ...prev, enrollments, payments };
      });
    };

    const setLessonPosition = (courseId, lessonIndex, seconds) => {
      setState((prev) => ({
        ...prev,
        enrollments: prev.enrollments.map((item) =>
          item.courseId === courseId ? { ...item, lessonIndex, seconds } : item
        ),
      }));
    };

    const markLessonDone = (courseId, lessonIndex, minutes) => {
      setState((prev) => {
        const enrollments = prev.enrollments.map((item) => {
          if (item.courseId !== courseId) return item;
          const completed = item.completed.includes(lessonIndex)
            ? item.completed
            : [...item.completed, lessonIndex];
          return { ...item, completed, lessonIndex };
        });
        const already = prev.enrollments
          .find((item) => item.courseId === courseId)
          ?.completed.includes(lessonIndex);
        if (already) return { ...prev, enrollments };
        return {
          ...prev,
          enrollments,
          goals: {
            ...prev.goals,
            lessonDisplay: undefined,
            watchDisplay: undefined,
            exerciseDisplay: undefined,
            lessonsDone: Math.min(prev.goals.lessonsTarget, prev.goals.lessonsDone + 1),
            watchMins: prev.goals.watchMins + minutes,
            exercisesDone: Math.min(prev.goals.exercisesTarget, prev.goals.exercisesDone + 1),
          },
        };
      });
    };

    const addNotification = (entry) => {
      setState((prev) => ({
        ...prev,
        notifications: [{ ...entry, id: `n-${Date.now()}` }, ...prev.notifications],
      }));
    };

    const removeNotification = (id) => {
      setState((prev) => ({
        ...prev,
        notifications: prev.notifications.filter((item) => item.id !== id),
      }));
    };

    return {
      ...state,
      signIn,
      signInDemo,
      signUp,
      signOut,
      deleteAccount,
      updateProfile,
      enroll,
      setLessonPosition,
      markLessonDone,
      addNotification,
      removeNotification,
    };
  }, [state]);

  return <AppContext.Provider value={api}>{children}</AppContext.Provider>;
}

export function useAppState() {
  const value = useContext(AppContext);
  if (!value) throw new Error('useAppState must be used inside AppStateProvider');
  return value;
}
