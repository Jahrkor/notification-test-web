import { SubmissionFormData } from "../models/interfaces.ts";

export const notificationService = {
  fetchNotification: async () => {
    try {
      const response = await fetch("http://localhost:3000/v1/notifications");
      if (!response.ok) {
        console.error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },

  sendNotification: async (data: SubmissionFormData) => {
    fetch("http://localhost:3000/v1/notification/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
  },
};
