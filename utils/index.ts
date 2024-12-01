import { envConfig } from "@/config/env";

export const Naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  minimumFractionDigits: 0,
});

export const dateHandler = (data: Date) => {
  const date = new Date(data);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // const dayOfWeekShort = daysOfWeek[date.getUTCDay()];
  const day = date.getUTCDate();
  const monthShort = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  const formattedDate = `${day} ${monthShort}, ${year}`;
  return formattedDate;
};

// export const openWhatsApp = () => {
//   const url = `https://wa.me/${envConfig.clientInfo.phoneNumber}?text=Hello, I would like to discuss how you can partner with us.`;

//   const newWindow = window.open(url, "_blank");

//   if (!newWindow) {
//     alert(
//       "Popup was blocked by the browser. Please allow popups for this site."
//     );
//   } else {
//     newWindow.focus();
//   }
// };


