import { Router, Request, Response } from 'express';
import { OrderController } from '../controllers/order.controller';
import { AuthenticatedRequest } from '../types/custom'; 

const router = Router();

router.get('/', (req, res) => {
  OrderController.getOrders(req as AuthenticatedRequest, res);
});

router.post('/', (req, res) => {
  OrderController.createOrder(req as AuthenticatedRequest, res);
})

router.put('/:id', (req: Request, res: Response) => {
  OrderController.updateOrder(req as AuthenticatedRequest, res);
});

// Eliminar un pedido
router.delete('/:id', (req: Request, res: Response) => {
  OrderController.deleteOrder(req as AuthenticatedRequest, res);
});

router.get('/:id/status', (req: Request, res: Response) => {
  OrderController.getOrderStatus(req as AuthenticatedRequest, res);
});
export const ordersRouter = router;