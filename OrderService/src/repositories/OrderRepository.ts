import { Repository,EntityRepository , } from "typeorm";
import { Order } from "../entities/order";


@EntityRepository(Order)
class OrderRepository extends Repository<Order>{

    async findAllOrders(): Promise<Order[]> {
        return this.find();
      }
    

}



export {OrderRepository}