import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("users")
class User {
  @PrimaryColumn()
  id?: string

  @Column()
  name: string

  @Column({})
  password: string

  @Column({ unique: true })
  email: string

  @Column()
  driver_license: string

  @Column({ default: false })
  is_admin: boolean

  @Column({ nullable: true })
  avatar?: string

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { User }