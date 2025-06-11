// const API_BASE_URL = "http://localhost:8080/api/v1";

const API_BASE_URL = "https://5aa2-177-53-200-49.ngrok-free.app/api/v1";

const headers = {
  "Content-Type": "application/json",
};

export const preRegister = async (user: {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/user/pre`, {
    method: "POST",
    headers: {
      ...headers,
      localKey:
        "Basic Q0hBVkVfUEFSQV9URVNURVNfTE9DQUlTOkZFSVJBX0ZBQ0lMX1NJTklTVFJB",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Erro no pré-registro.");
  }

  const contentLength = response.headers.get("content-length");
  if (contentLength && parseInt(contentLength) > 0) {
    return await response.json();
  }

  return { success: true };
};

export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/auth`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Usuário não encontrado.");
  }

  return data;
};

export const sendForgotPasswordEmail = async (email: string) => {
  const response = await fetch(`${API_BASE_URL}/user/forgot-password`, {
    method: "POST",
    headers: { ...headers, email },
  });

  if (!response.ok) {
    throw new Error("Não foi possível enviar o e-mail de recuperação.");
  }
};

export const resetPassword = async (
  email: string,
  password: string,
  token: string
): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/user/reset-password`, {
    method: "POST",
    headers: {
      ...headers,
      email,
      password,
      token,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Erro ao redefinir a senha.");
  }
};