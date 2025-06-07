const BASE_URL = "http://localhost:8080/api/v1";

export const authService = {
  async login(email: string, password: string) {
    const response = await fetch(`${BASE_URL}/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao fazer login.");
    }

    return response.json();
  },

  async forgotPassword(email: string) {
    const response = await fetch(`${BASE_URL}/user/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        email,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || "Erro ao enviar e-mail de recuperação.");
    }

    return response;
  },

  async resetPassword(email: string, password: string, token: string) {
    const response = await fetch(`${BASE_URL}/user/reset-password`, {
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
  },
};