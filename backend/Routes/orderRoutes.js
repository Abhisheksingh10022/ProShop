import express from "express";
import { addOrderItems } from "../controllers/orderController.js";
import protect from "../Middlewares/authMiddleware.js"
import { getOrderById ,updateOrderToPaid
,getMyOrders} from "../controllers/orderController.js";

const router=express.Router();

router.route('/').post(protect,addOrderItems);
router.route('/myorders').get(protect,getMyOrders);
router.route('/:id').get(protect,getOrderById);
router.route('/:id/pay').put(protect,updateOrderToPaid);

export default router;