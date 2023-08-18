export function createDateWithString(dateString: string) {
  const dateStringSplit = dateString.split("-");
  dateStringSplit.push(dateStringSplit.shift()!);
  const rearrangedDateString = dateStringSplit.join("-");
  const options = Intl.DateTimeFormat().resolvedOptions();

  return new Date(
    new Date(rearrangedDateString).toLocaleDateString(options.locale, {
      timeZone: options.timeZone,
    })
  );
}
export function createDate() {
  const options = Intl.DateTimeFormat().resolvedOptions();

  return new Date(
    new Date().toLocaleDateString(options.locale, {
      timeZone: options.timeZone,
    })
  );
}
