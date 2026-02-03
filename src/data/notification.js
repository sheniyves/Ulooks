export const notifications = [
  {
    id: 1,
    title: "Booking Confirmed",
    message:
      "You're all set! Your appointment with [Provider Name] is confirmed for [Date & Time]",
    time: "54 mins",
    type: "confirmed",
    status: "unRead",
  },
  {
    id: 2,
    title: "Booking Rescheduled",
    message:
      "Heads up! Your booking with [Provider Name] has been rescheduled to [New Date & Time]",
    time: "54 mins",
    type: "rescheduled",
    status: "unRead",
  },
  {
    id: 3,
    title: "Booking Canceled by Provider",
    message:
      "Heads up! Your booking with [Provider Name] has been rescheduled to [New Date & Time]",
    time: "1 hr",
    type: "canceled",
    status: "read",
  },
  {
    id: 4,
    title: "Booking Reminder",
    message:
      "Reminder: Your beauty session with [Provider Name] is coming up tomorrow at [Time]. Get ready to glow!",
    time: "1 hr",
    type: "reminder",
    status: "read",
  },
  {
    id: 5,
    title: "Booking Completed",
    message:
      "Hope you loved your session with [Provider Name]! Don’t forget to leave a review.",
    time: "6 hr",
    type: "completed",
    status: "unRead",
  },
];
