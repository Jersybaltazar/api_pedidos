import { Request, Response } from 'express';
import { OrderService } from '../services/order.services';
import { AuthenticatedRequest } from '../types/custom';

export const OrderController = {
  createOrder: async (req: AuthenticatedRequest, res: Response) => {
    try {
      const order = await OrderService.createOrder(req.user.id, req.body);
      res.status(201).json(order);
    } catch (error : any) {
      res.status(400).json({ error: error.message });
    }
  },

  getOrders: async (req: AuthenticatedRequest, res: Response) => {
    try {
      const orders = await OrderService.getUserOrders(req.user.id);
      res.json(orders);
    } catch (error : any) {
      res.status(500).json({ error: error.message });
    }
  },

  getOrder: async (req: AuthenticatedRequest, res: Response) => {
    try {
      const order = await OrderService.getOrderById(
        req.user!.id,
        parseInt(req.params.id)
      );
      order ? res.json(order) : res.status(404).json({ error: 'Order not found' });
    } catch (error : any) {
      res.status(500).json({ error: error.message });
    }
  },
  updateOrder: async (req: AuthenticatedRequest, res: Response) => {
    try {
      const updatedOrder = await OrderService.updateOrder(
        req.user.id,
        parseInt(req.params.id),
        req.body
      );
      res.json(updatedOrder);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },
  deleteOrder: async (req: AuthenticatedRequest, res: Response) => {
    try {
      await OrderService.deleteOrder(req.user.id, parseInt(req.params.id));
      res.status(204).send(); // No Content
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },
  getOrderStatus: async (req: AuthenticatedRequest, res: Response) => {
    try {
      const status = await OrderService.getOrderStatus(req.user.id, parseInt(req.params.id));
      status ? res.json({ status }) : res.status(404).json({ error: 'Order not found' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

};