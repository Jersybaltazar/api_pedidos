import { User } from './user';
export const ORDER_STATUS = {
  EN_PREPARACION: "EN_PREPARACION",
  EN_CAMINO: "EN_CAMINO",
  ENTREGADO: "ENTREGADO",
} as const;

export type OrderStatus = typeof ORDER_STATUS[keyof typeof ORDER_STATUS];


export type CreateOrderDTO = {
  description: string;
  quantity: number;
  status?: OrderStatus; // Opcional, valor por defecto en servicio
};

export type UpdateOrderDTO = Partial<CreateOrderDTO>;

export type OrderResponse = {
  id: number;
  description: string;
  quantity: number;
  status: OrderStatus;
  createdAt: Date;
  user: Pick<User, 'id' | 'email'>;
};
