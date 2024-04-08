export interface Base {
  _id: string;
  name: string;
}
export interface Category extends Base {}

export interface Channel extends Base {}

export interface User extends Base {
  subscribed: string[];
  email: string;
  channels: string[];
  id: string;
  phoneNumber: string;
}
export interface Notification extends Base {
  createdAt: string;
  category: Category;
  channel: Channel;
  message: string;
  user: User;
}

export interface BaseServer {
  message: string;
}

export interface CategoryServerResponse extends BaseServer {
  data: Category[];
}

export interface SubmissionFormData {
  message: string;
  categories: string[];
  channels: string[];
}
