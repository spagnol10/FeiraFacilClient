import { User } from "@/types/User";

const API_URL = 'http://localhost:8080/api/v1/user';

export const fetchUser = async (token: string): Promise<User> => {
  console.log(`Buscando usuário com token: ${token}`);
  
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar usuário");
  }

  return await response.json();
};

export const updateUser = async (user: User): Promise<void> => {
  const response = await fetch(`${API_URL}/${user.email}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });

  if (!response.ok) throw new Error("Erro ao atualizar usuário");
};

