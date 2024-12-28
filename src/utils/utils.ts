import { jwtDecode, JwtPayload } from "jwt-decode";

import { format } from "date-fns";
interface CustomJwtPayload extends JwtPayload {
  userId: string; // Add any other properties you expect in the token
}

export const getDecodedToken = (): CustomJwtPayload | null => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        return jwtDecode<CustomJwtPayload>(token); // Specify the return type
      } catch (error) {
        console.error("Invalid token", error);
        return null;
      }
    }
  }
  return null;
};
export const getUserId = (): string | null => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken: CustomJwtPayload | null = jwtDecode<CustomJwtPayload>(token);
        return decodedToken?.userId || null; // Return userId or null if not found
      } catch (error) {
        console.error("Invalid token", error);
        return null;
      }
    }
  }
  return null;
};
export const getRole = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("role");
  }
  return null;
};

export const getUserDetails = () => {
  if (typeof window !== "undefined") {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      try {
        return JSON.parse(userInfo);
      } catch (error) {
        console.error("Error parsing user details from localStorage", error);
        return null;
      }
    }
  }
  return null;
};

export const getGreeting = (): string => {
  const now = new Date();
  const hours = now.getHours();

  if (hours >= 5 && hours < 12) {
    return "Good Morning !";
  } else if (hours >= 12 && hours < 18) {
    return "Good Afternoon !";
  } else if (hours >= 18 && hours < 22) {
    return "Good Evening !";
  } else {
    return "Good Night !";
  }
};


/**
 * Formats a time string or Date object into "hh:mm:ss a" format.
 * @param {string | Date} time - The time to format (ISO string, timestamp, or Date object).
 * @returns {string} - Formatted time (e.g., "11:00:00 PM") or "N/A" if invalid.
 */
export const formatTime = (time:any) => {
  if (!time || time === "N/A") return "N/A"; // Handle empty or invalid time
  try {
    const date = new Date(time); // Convert input to a Date object
    if (isNaN(date.getTime())) return "N/A"; // Check for invalid date
    return format(date, "hh:mm:ss a"); // Format as 11:00:00 PM
  } catch {
    return "N/A"; // Fallback for unexpected errors
  }
};

/**
 * Formats a date string or Date object into "MM/dd/yyyy" format.
 * @param {string | Date | null | undefined} date - The date to format (ISO string, timestamp, or Date object).
 * @returns {string} - Formatted date (e.g., "12/28/2024") or "N/A" if invalid.
 */
export const formatDate = (date: string | Date | null | undefined): string => {
  if (!date || date === "N/A") return "N/A"; // Handle empty or invalid date
  try {
    const parsedDate = new Date(date); // Convert input to a Date object
    if (isNaN(parsedDate.getTime())) return "N/A"; // Check for invalid date
    return format(parsedDate, "MM/dd/yyyy"); // Format as MM/dd/yyyy
  } catch {
    return "N/A"; // Fallback for unexpected errors
  }
};