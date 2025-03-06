export function getWeekday(date: Date) {
  const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
  return days[new Date(date).getDay()]
}
