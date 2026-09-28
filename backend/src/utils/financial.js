export const money = (value) => Math.round((Number(value) + Number.EPSILON) * 100) / 100;
export const percentage = (part, total) => total > 0 ? money((Number(part) / Number(total)) * 100) : 0;
export const monthBounds = (month = new Date()) => {
  const d = new Date(month); const start = new Date(d.getFullYear(), d.getMonth(), 1); const end = new Date(d.getFullYear(), d.getMonth() + 1, 1);
  return { start: start.toISOString().slice(0, 10), end: end.toISOString().slice(0, 10) };
};
