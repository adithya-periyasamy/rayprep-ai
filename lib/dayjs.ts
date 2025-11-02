// lib/dayjs.ts
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

// Set default timezone to India
dayjs.tz.setDefault("Asia/Kolkata");

export default dayjs;
