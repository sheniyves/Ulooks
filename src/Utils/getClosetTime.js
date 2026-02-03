export const getClosestAvailableTimeId = (availableTime, selectedDateStr = new Date()) => {
  const now = new Date();
  const selectedDate = new Date(selectedDateStr);

  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const parseTime = (timeStr) => {
    const [hourMin, period] = timeStr.split(/(AM|PM)/);
    let [hour, min] = hourMin.split(":").map(Number);
    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;
    return hour * 60 + min;
  };

  const availableTimesSorted = availableTime
    ?.filter((time) => time.isAvailable)
    ?.map((t) => ({ ...t, minutes: parseTime(t.time) }))
    ?.sort((a, b) => a.minutes - b.minutes);

  if (
    selectedDate.getFullYear() === now.getFullYear() &&
    selectedDate.getMonth() === now.getMonth() &&
    selectedDate.getDate() === now.getDate()
  ) {
    const closest = availableTimesSorted?.find((t) => t.minutes >= nowMinutes);
    return closest ? closest.id : availableTimesSorted[0]?.id || 1;
  }

  return availableTimesSorted[0]?.id || 1;
};


export const isTodaySelected = (selectedDate) => {
  const today = new Date();
  const selected = new Date(selectedDate);
  return (
    today.getFullYear() === selected.getFullYear() &&
    today.getMonth() === selected.getMonth() &&
    today.getDate() === selected.getDate()
  );
};



export const isTimeInPast = (timeStr, selectedDateStr) => {
  const [rawTime, period] = timeStr.match(/(\d{1,2}:\d{2})(AM|PM)/).slice(1);
  let [hour, minute] = rawTime.split(":").map(Number);

  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;

  const selectedDate = new Date(selectedDateStr);
  const now = new Date();

  // If selected date is NOT today, no time is in the past
  if (
    selectedDate.getFullYear() !== now.getFullYear() ||
    selectedDate.getMonth() !== now.getMonth() ||
    selectedDate.getDate() !== now.getDate()
  ) {
    return false;
  }

  // Only compare full date+time if it's today
  selectedDate.setHours(hour, minute, 0, 0);
  return selectedDate < now;
};

