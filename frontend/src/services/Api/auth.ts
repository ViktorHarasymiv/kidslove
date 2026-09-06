import axios, { AxiosError } from "axios";

import { API_URL } from "../../config/api.ts";
import type { LoginValues, RegisterValues, User } from "../../types/auth";

// REGISTER

export async function register(data: RegisterValues) {
  const res = await axios.post(`${API_URL}/auth/register`, data, {
    withCredentials: true,
  });
  return res.data;
}

// LOGIN

export async function login(data: LoginValues) {
  const res = await axios.post(`${API_URL}/auth/login`, data, {
    withCredentials: true,
  });
  return res.data;
}

// PATCH

export const editProfile = async (data: User) => {
  try {
    const res = await axios.patch(`${API_URL}/users/me`, data, {
      withCredentials: true,
    });

    return {
      success: true,
      data: res.data,
      error: null,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { status } = error.response;

      return {
        success: false,
        data: null,
        error: {
          status,
        },
      };
    }

    return {
      success: false,
      data: null,
      error: {
        status: null,
        messages: ["Помилка з’єднання або невідома помилка"],
      },
    };
  }
};

// CHECK SESSION

export const checkSession = async () => {
  try {
    const res = await axios.get(`${API_URL}/auth/session`, {
      withCredentials: true,
    });
    return res.data.valid;
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      return false;
    }
    throw err;
  }
};

// RERFRESH SESSION

export const refreshSession = async () => {
  const res = await axios.post(
    `${API_URL}/auth/refresh`,
    {},
    {
      withCredentials: true,
    },
  );

  return res.data;
};

// AUTH ME

export const getMe = async () => {
  const { data } = await axios.get(`${API_URL}/auth/me`, {
    withCredentials: true,
  });

  return data;
};

// LOGOUT

export const logout = async () => {
  await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
};

// DELETE

export const deleteAccount = async () => {
  try {
    const res = await axios.delete(`${API_URL}/users/delete`, {
      withCredentials: true,
    });

    if (res?.status === 200 || res?.status === 204) {
      logout();
    }
  } catch (err) {
    console.error("Delete account error:", err);
  }
};

// UPLOAD PHOTO

export const uploadUserPhoto = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await axios.post(`${API_URL}/user/upload`, formData);
  return data.url;
};

// GOOGLE

// export const handleGoogleLogin = async () => {
//   try {
//     const res = await axios.get(`${API_URL}/auth/get-oauth-url`);

//     const url = res.data.data.url;

//     window.location.href = url;
//   } catch (err) {
//     console.error("Failed to get Google OAuth URL", err);
//   }
// };

// VERIFY

// export const verifyEmailCode = async (email, code) => {
//   if (!email || !code) {
//     throw new Error("Email і код обовʼязкові");
//   }

//   try {
//     const response = await axios.post(`${API_URL}/auth/verify`, {
//       email,
//       code,
//     });
//     return response.data; // повертаємо результат бекенду
//   } catch (error) {
//     console.error(
//       "Verification failed:",
//       error.response?.data || error.message,
//     );
//     throw error; // пробросимо помилку далі, щоб UI міг показати повідомлення
//   }
// };
