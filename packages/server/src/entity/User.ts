import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: false })
  firstName: string;

  @Column({ unique: false })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
