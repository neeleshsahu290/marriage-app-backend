import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
} from "typeorm";

@Entity("users")
export class User {

  // Primary key 
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @Generated("increment")
  user_id: number;

  @Column({ nullable: true, unique: true })
  phone?: string;

  @Column({ nullable: true, unique: true })
  email?: string;

  @Column()
  password_hash: string;

  @Column({ default: false })
  phone_verified: boolean;

  @Column({ default: false })
  email_verified: boolean;

  @Column({ default: false })
  onboarding_completed: boolean;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
