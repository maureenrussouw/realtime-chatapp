
type User = {
  id: string;
  name: string;
  avatar: string;
};

export type MessageType = {
  id: string;
  text: string;
  createdAt: string;
  senderId: string;
  receiverId: string;
  sender: User;
  receiver: User;
};