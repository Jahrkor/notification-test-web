import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import { notificationService } from "../services/notifications.ts";
import { Notification } from "../models/interfaces.ts";
import { Button } from "primereact/button";

function LogHistory() {
  const [notifications, setNotifications] = useState([]);

  const transformResponseToTable = (notifications: any) => {
    return notifications.data.map((data: Notification) => ({
      category: data.category.name,
      channel: data.channel.name,
      name: data.user.name,
      message: data.message,
      created: data.createdAt,
    }));
  };

  const getNotifications = () => {
    notificationService.fetchNotification().then((notifications: any) => {
      const data = transformResponseToTable(notifications);
      setNotifications(data);
    });
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <>
      <div className="flex flex-row-reverse flex-wrap">
        <div
            className="flex align-items-center justify-content-center font-bold border-round m-2">
          <Button
              label="Refresh"
              className="border-primary-500 px-3 py-2 text-base border-1 border-solid border-round cursor-pointer transition-all transition-duration-200 hover:bg-primary-600 hover:border-primary-600 active:bg-primary-700 active:border-primary-700"
              onClick={getNotifications}
          />
        </div>
      </div>
      <div className="field">
        <DataTable value={notifications} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{minWidth: "50rem"}}>
          <Column field="name" header="Name"></Column>
          <Column field="category" header="Category"></Column>
          <Column field="channel" header="Channel"></Column>
          <Column field="message" header="Message"></Column>
          <Column field="created" header="Send Date"></Column>
        </DataTable>
      </div>
    </>
  );
}

export default LogHistory;
