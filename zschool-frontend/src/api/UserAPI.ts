import { UserRegistrationRequest } from "../models";

export const registerUser = async (user: UserRegistrationRequest) => {
  try {
    const response = await fetch("http://localhost:8080/zschool/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const combinedMessage: string = Object.values(errorData).join("\n");
      throw new Error(combinedMessage);
    }
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};
