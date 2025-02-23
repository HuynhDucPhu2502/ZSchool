import { Contact } from "../models";

export const sendContact = async (contact: Contact) => {
  if (
    contact.name.trim() === "" ||
    contact.email.trim() === "" ||
    contact.subject.trim() === "" ||
    contact.mobileNumber.trim() === "" ||
    contact.message.trim() === ""
  )
    throw new Error("Các trường thông tin phải được điền.");

  try {
    const response = await fetch(
      "http://localhost:8080/zschool/api/contact/save",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      const combinedMessage: string = Object.values(errorData).join("\n");
      throw new Error(combinedMessage);
    }
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};
