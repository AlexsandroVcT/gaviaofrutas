type StoreHour = {
  day: number;
  open: string | null;
  close: string | null;
};

type StoreSpecialHour = {
  date: string;
  open: string | null;
  close: string | null;
  note?: string;
};

type StoreLike = {
  timeZone: string;
  hours: StoreHour[];
  specialHours?: StoreSpecialHour[];
};

type StoreStatus = {
  isOpen: boolean;
  text: string;
  nextText: string;
};

const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

const WEEKDAY_LABEL_PT = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];

type LocalClock = {
  day: number;
  minutes: number;
  dateKey: string;
};

type DailyHours = {
  open: string | null;
  close: string | null;
};

function parseMinutes(time: string) {
  const [hh = '0', mm = '0'] = time.split(':');
  const hour = Number.parseInt(hh, 10);
  const minute = Number.parseInt(mm, 10);
  return (Number.isFinite(hour) ? hour : 0) * 60 + (Number.isFinite(minute) ? minute : 0);
}

function getLocalDateKey(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);

  const year = parts.find((part) => part.type === 'year')?.value ?? '1970';
  const month = parts.find((part) => part.type === 'month')?.value ?? '01';
  const day = parts.find((part) => part.type === 'day')?.value ?? '01';

  return `${year}-${month}-${day}`;
}

function getLocalClock(date: Date, timeZone: string): LocalClock {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date);

  const weekday = parts.find((part) => part.type === 'weekday')?.value ?? 'Mon';
  const hour = Number.parseInt(parts.find((part) => part.type === 'hour')?.value ?? '0', 10);
  const minute = Number.parseInt(parts.find((part) => part.type === 'minute')?.value ?? '0', 10);

  return {
    day: WEEKDAY_INDEX[weekday] ?? 1,
    minutes: hour * 60 + minute,
    dateKey: getLocalDateKey(date, timeZone),
  };
}

function findSpecialHours(specialHours: StoreSpecialHour[] | undefined, dateKey: string) {
  if (!specialHours?.length) return null;
  return specialHours.find((item) => item.date === dateKey) ?? null;
}

function getRegularHours(hours: StoreHour[], day: number): DailyHours | null {
  const entry = hours.find((item) => item.day === day);
  if (!entry) return null;
  return { open: entry.open, close: entry.close };
}

function getHoursForDate(store: StoreLike, day: number, dateKey: string): DailyHours | null {
  const special = findSpecialHours(store.specialHours, dateKey);
  if (special) {
    return { open: special.open, close: special.close };
  }
  return getRegularHours(store.hours, day);
}

function getFutureOpening(store: StoreLike, now: Date) {
  for (let offset = 1; offset <= 14; offset += 1) {
    const candidate = new Date(now);
    candidate.setDate(now.getDate() + offset);

    const dateKey = getLocalDateKey(candidate, store.timeZone);
    const day = getLocalClock(candidate, store.timeZone).day;
    const hours = getHoursForDate(store, day, dateKey);

    if (hours?.open) {
      const dayLabel = offset === 1 ? 'amanha' : WEEKDAY_LABEL_PT[day];
      return `Abre ${dayLabel} as ${hours.open}`;
    }
  }

  return 'Sem horario definido';
}

function isOpenNow(minutes: number, open: string, close: string) {
  const openMinutes = parseMinutes(open);
  const closeMinutes = parseMinutes(close);

  if (closeMinutes >= openMinutes) {
    return minutes >= openMinutes && minutes < closeMinutes;
  }

  return minutes >= openMinutes || minutes < closeMinutes;
}

export function getStoreStatus(store: StoreLike, date = new Date()): StoreStatus {
  const clock = getLocalClock(date, store.timeZone);
  const currentHours = getHoursForDate(store, clock.day, clock.dateKey);

  if (currentHours?.open && currentHours?.close) {
    const openMinutes = parseMinutes(currentHours.open);

    if (isOpenNow(clock.minutes, currentHours.open, currentHours.close)) {
      return {
        isOpen: true,
        text: 'Aberto agora',
        nextText: `Fecha as ${currentHours.close}`,
      };
    }

    if (clock.minutes < openMinutes) {
      return {
        isOpen: false,
        text: 'Fechado agora',
        nextText: `Abre hoje as ${currentHours.open}`,
      };
    }
  }

  return {
    isOpen: false,
    text: 'Fechado agora',
    nextText: getFutureOpening(store, date),
  };
}

export function getStoreClockLabel(store: StoreLike, date = new Date()) {
  return new Intl.DateTimeFormat('pt-BR', {
    timeZone: store.timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
}
