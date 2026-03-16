import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { User } from "./User";

export enum SubscriptionStatus {
  ACTIVE = "active",
  EXPIRED = "expired",
  CANCELLED = "cancelled",
  PENDING = "pending",
}

export enum SubscriptionPlan {
  MONTHLY = "monthly",
  SIX_MONTHS = "six_months",
  YEARLY = "yearly",
}

@Entity({ name: "subscriptions", synchronize: true })
export class Subscription {
  // UUID primary
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // relation to user
  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

@Column()
user_id: string;

  // plan
  @Column({
    type: "enum",
    enum: SubscriptionPlan,
  })
  plan: SubscriptionPlan;

  // price
  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
  })
  price: number;

  // payment id from paypal/stripe
  @Column({ nullable: true })
  payment_id?: string;

  // status
  @Column({
    type: "enum",
    enum: SubscriptionStatus,
    default: SubscriptionStatus.PENDING,
  })
  status: SubscriptionStatus;

  // start date
  @Column({ type: "timestamp" })
  start_date: Date;

  // expire date
  @Column({ type: "timestamp" })
  expire_date: Date;

  // timestamps
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
