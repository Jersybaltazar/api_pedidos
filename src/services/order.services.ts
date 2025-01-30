import { PrismaClient } from "@prisma/client";
import {
  CreateOrderDTO,
  UpdateOrderDTO,
  OrderResponse,
  OrderStatus,
} from "../models/order";
import { ORDER_STATUS } from '../models/order';

const prisma = new PrismaClient();

export class OrderService {
  static async createOrder(
    userId: number,
    dto: CreateOrderDTO
  ): Promise<OrderResponse> {
    return prisma.order.create({
      data: {
        description: dto.description,
        quantity: dto.quantity,
        status: dto.status || ORDER_STATUS.EN_PREPARACION,
        userId: userId,
      },
      include: {  // Incluir relación con user
        user: {
          select: {
            id: true,
            email: true
          }
        }
      }
    });
  }

  static async getUserOrders(userId: number): Promise<OrderResponse[]> {
    return prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {  // Incluir en todas las consultas
        user: {
          select: {
            id: true,
            email: true
          }
        }
      }
    });
  }

  static async getOrderById(
    userId: number,
    orderId: number
  ): Promise<OrderResponse | null> {
    return prisma.order.findFirst({
      where: {
        id: orderId,
        userId: userId,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true
          }
        }
      }
    });
  }
  static async updateOrder(
    userId: number,
    orderId: number,
    dto: UpdateOrderDTO
  ): Promise<OrderResponse | null> {
    const order = await prisma.order.findFirst({
      where: { id: orderId, userId }
    });

    if (!order) throw new Error('Order not found');

    return prisma.order.update({
      where: { id: orderId },
      data: {
        description: dto.description,
        quantity: dto.quantity,
        status: dto.status,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true
          }
        }
      }
    });
  }

  static async deleteOrder(userId: number, orderId: number): Promise<void> {
    const order = await prisma.order.findFirst({
      where: { id: orderId, userId }
    });

    if (!order) throw new Error('Order not found');

    await prisma.order.delete({
      where: { id: orderId }
    });
  }

  static async getOrderStatus(userId: number, orderId: number): Promise<OrderStatus | null> {
    const order = await prisma.order.findFirst({
      where: { id: orderId, userId },
      select: { status: true }
    });

    return order?.status || null;
  }


  // Resto de métodos sin cambios...
}