export const storeGoogleMetadata = {
  address: 'R. Benedito Mascarenhas, 62 - Santa Luzia do Norte - AL',
  timeZone: 'America/Maceio',
  hours: [
    { day: 0, open: '07:00', close: '19:00' },
    { day: 1, open: '07:00', close: '20:00' },
    { day: 2, open: '07:00', close: '20:00' },
    { day: 3, open: '07:00', close: '20:00' },
    { day: 4, open: '07:00', close: '20:00' },
    { day: 5, open: '07:00', close: '20:00' },
    { day: 6, open: '07:00', close: '20:00' },
  ],
  specialHours: [] as Array<{ date: string; open: string | null; close: string | null; note?: string }>,
};
