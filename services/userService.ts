import { User } from "@/types/User";

const API_URL = 'http://localhost:8080/users';

export const fetchUser = async (email: string): Promise<User> => {
  const response = await fetch(`${API_URL}/${email}`);
  if (!response.ok) throw new Error("Erro ao buscar usuário");
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