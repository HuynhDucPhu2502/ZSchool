import axios from "axios";
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
    await axios.post(
      "http://localhost:8080/zschool/api/contact/save",
      contact,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessageCombined = Object.values(error.response?.data).join(
        "\n"
      );
      throw { message: errorMessageCombined };
    }
    throw { message: "Lỗi không xác định" };
  }
};
