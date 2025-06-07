const API_BASE_URL = "http://localhost:8080/api/v1";

export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
    headers: {
      "Content-Type": "application/json",
      email,
    },
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
      "Content-Type": "application/json",
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