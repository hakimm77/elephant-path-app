export interface IConversation {
  role: "user" | "assistant";
  content: string;
  id: string | number[];
}
