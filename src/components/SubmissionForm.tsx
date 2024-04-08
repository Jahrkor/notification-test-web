import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { categoryServices } from "../services/categories.ts";
import { Category, Channel, SubmissionFormData } from "../models/interfaces.ts";
import { channelService } from "../services/channels.ts";
import { notificationService } from "../services/notifications.ts";

interface FormData {
  category: Category;
  message: string;
  channel: Channel;
}

function SubmissionForm() {
  const formDataInitialState: FormData = {
    category: { name: "", _id: "" },
    message: "",
    channel: { name: "", _id: "" },
  };
  const [categories, setCategories]: [
    Category[],
    Dispatch<SetStateAction<Category[]>>,
  ] = useState([] as any);
  const [channels, setChannels]: [
    Channel[],
    Dispatch<SetStateAction<Channel[]>>,
  ] = useState([] as any);
  const [formData, setFormData]: [
    FormData,
    Dispatch<SetStateAction<FormData>>,
  ] = useState(formDataInitialState);
  const [status, setStatus]: [string, Dispatch<SetStateAction<string>>] =
    useState("");
  const [message, setMessage]: [string, Dispatch<SetStateAction<string>>] =
    useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!formData.message) {
      setMessage("Message cannot be empty");
      return;
    }
    if (!formData.category) {
      setMessage("Category cannot be empty");
      return;
    }
    if (!formData.channel) {
      setMessage("Channel cannot be empty");
      return;
    }
    const data: SubmissionFormData = {
      message: formData.message,
      categories: [formData.category._id],
      channels: [formData.channel._id],
    };

    notificationService
      .sendNotification(data)
      .then((message: any) => {
        setFormData(formDataInitialState);
        setMessage(message);
        setStatus("success");
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.toString());
        setStatus("error");
      });
  };

  useEffect(() => {
    categoryServices
      .fetchCategories()
      .then((categories: Category[] | []) => setCategories(categories));
    channelService
      .fetchChannels()
      .then((channel: Channel[]) => setChannels(channel));
  }, []);

  function handleChange(evt: any) {
    const { target } = evt;
    const { name, value } = target;

    const newData = {
      ...formData,
      [name]: value,
    };

    setFormData(newData);
  }

  return (
    <>
      <div>
        <h3>Send Notification</h3>
        <form onSubmit={handleSubmit}>
          <div className="formgrid grid">
            <div className="field col">
              <Dropdown
                value={formData.category}
                onChange={handleChange}
                options={categories}
                optionLabel="name"
                name="category"
                className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                placeholder="Select a Category"
              />
            </div>
            <div className="field col">
              <Dropdown
                value={formData.channel}
                onChange={handleChange}
                options={channels}
                optionLabel="name"
                name="channel"
                placeholder="Select a Channel"
                className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
              />
            </div>
          </div>

          <div className="field">
            <InputTextarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              cols={30}
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field">
            <button
              type="submit"
              className="border-primary-500 px-3 py-2 text-base border-1 border-solid border-round cursor-pointer transition-all transition-duration-200 hover:bg-primary-600 hover:border-primary-600 active:bg-primary-700 active:border-primary-700"
            >
              Send
            </button>
          </div>
        </form>
      </div>
      {(() => {
        if (status === "success") {
          return (
            <>
              <div>Thank you!</div>
              <div>{message}</div>
            </>
          );
        }
        if (status === "error") {
          return (
            <>
              <div>something went wrong!</div>
              <div>{message}</div>
            </>
          );
        }
        if (message) {
          return (
            <>
              <div>{message}</div>
            </>
          );
        }
      })()}
    </>
  );
}

export default SubmissionForm;
