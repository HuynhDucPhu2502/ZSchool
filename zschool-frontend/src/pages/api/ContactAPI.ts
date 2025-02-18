import Contact from "../models/Contact";

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
    await fetch("http://localhost:8080/zschool/api/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });
  } catch (error) {
    if (error instanceof Error)
      throw new Error("Gửi tin nhắn thất bại, vui lòng thử lại.");
  }
};
