import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("rentals")
class Rental {
  @PrimaryColumn()
  id: string

  @Column()
  car_id: string

  // @ManyToOne(() => Car)
  // car: Car;

  @Column()
  user_id: string

  @Column()
  start_date: Date

  @Column()
  end_date: Date

  @Column()
  expected_return_date: Date

  @Column()
  total: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Rental }