import { UserLoginRequest, UserRegistrationRequest } from "../models";

export const registerUser = async (user: UserRegistrationRequest) => {
  try {
    const response = await fetch(
      "http://localhost:8080/zschool/api/user/save",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      const combinedMessage: string = Object.values(errorData).join(". ");
      throw new Error(combinedMessage);
    }
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};

export const loginUser = async (user: UserLoginRequest) => {
  try {
    const response = await fetch("http://localhost:8080/zschool/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      const combinedMessage: string = Object.values(errorData).join(". ");
      throw new Error(combinedMessage);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
