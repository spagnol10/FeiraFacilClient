const API_URL = "http://localhost:8080/api/v1/product";

export async function fetchProducts({
  companyId,
  category,
  name,
  inStock = true,
}: {
  companyId: string;
  category?: string;
  name?: string;
  inStock?: boolean;
}) {
  try {
    const url = new URL(API_URL);
    url.searchParams.append("companyId", companyId);
    if (category) url.searchParams.append("category", category);
    if (name) url.searchParams.append("name", name);
    url.searchParams.append("inStock", inStock.toString());

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error("Erro ao buscar produtos");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro no serviço de produtos:", error);
    throw error;
  }
}