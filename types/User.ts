export interface User {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

type OrderItem = {
  name: string;
  quantity: number;
};

type Order = {
  id: string;
  date: string;
  store: string;
  orderNumber: string;
  items: OrderItem[];
};