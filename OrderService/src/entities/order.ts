
import { Entity, PrimaryGeneratedColumn, Column , TableForeignKey } from "typeorm";


@Entity()
export class Order{
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  TickerId!: number;


}
