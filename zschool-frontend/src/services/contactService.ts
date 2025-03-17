import axios from "axios";
import { Contact } from "../models";

type SendContactProps = {
  contact: Contact;
  isAuthenticated: boolean;
};

export const sendContact = async (data: SendContactProps) => {
  if (
    data.contact.name.trim() === "" ||
    data.contact.email.trim() === "" ||
    data.contact.subject.trim() === "" ||
    data.contact.mobileNumber.trim() === "" ||
    data.contact.message.trim() === ""
  )
    throw new Error("Các trường thông tin phải được điền.");

  const url = data.isAuthenticated
    ? "http://localhost:8080/zschool/api/contact/saveWithLogin"
    : "http://localhost:8080/zschool/api/contact/saveWithoutLogin";

  try {
    await axios.post(url, data.contact, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
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
