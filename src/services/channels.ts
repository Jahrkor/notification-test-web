import { Channel } from "../models/interfaces.ts";

export const channelService = {
  fetchChannels: async (): Promise<Channel[] | []> => {
    try {
      const response = await fetch("http://localhost:3000/v1/channels");
      if (!response.ok) {
        console.error("Network response was not ok");
      }
      const jsonData = await response.json();
      return jsonData.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  },
};
