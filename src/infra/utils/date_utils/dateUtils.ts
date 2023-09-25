export type DateDetails = {
  day: string;
  month: string;
  year: string;
};

export class DateUtils {
  getDate(options: { plusDays?: number }, currentDate?: DateDetails): DateDetails {
    const daysToAdd = options.plusDays || 0;

    let futureDate: Date;
    currentDate
      ? (futureDate = new Date(Date.parse(`${currentDate.month}/${currentDate.day}/${currentDate.year}`)))
      : (futureDate = new Date());
    futureDate.setDate(futureDate.getDate() + daysToAdd);

    // Adding leading '0' to 'days' and 'months' if it's missing.
    const day = futureDate.getDate().toString().padStart(2, '0');
    const month = (futureDate.getMonth() + 1).toString().padStart(2, '0');
    const year = futureDate.getFullYear().toString();

    return { day: day, month: month, year: year };
  }
}
