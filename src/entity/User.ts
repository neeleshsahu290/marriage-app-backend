import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { UserProfile } from "./UserProfile";

export enum PhotoVisibility {
  HIDDEN = "hidden",
  BLURRED_PREVIEW = "blurred_preview",
  VISIBLE_TO_MATCHES = "visible_to_matches",
}

@Entity({ name: "users", synchronize: true })
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

  @Column({ default: true })
  show_online_status: boolean;

  @Column({ default: true })
  show_email: boolean;

  @Column({ default: true })
  show_phone: boolean;

  @Column({
    type: "enum",
    enum: PhotoVisibility,
    default: PhotoVisibility.BLURRED_PREVIEW,
  })
  photo_visibility: PhotoVisibility;

  @Column({
  type: "decimal",
  precision: 10,
  scale: 7,
  nullable: true,
})
latitude?: number;

@Column({
  type: "decimal",
  precision: 10,
  scale: 7,
  nullable: true,
})
longitude?: number;

  @Column({ type: "timestamp", nullable: true })
  last_recommended_at?: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
