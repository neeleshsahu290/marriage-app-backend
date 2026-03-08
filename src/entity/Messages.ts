import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Conversation } from "./Conversation";

@Entity({ name: "messages", synchronize: true })
export class Message {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid")
  conversation_id: string;

  @ManyToOne(() => Conversation)
  @JoinColumn({ name: "conversation_id", referencedColumnName: "id" })
  conversation!: Conversation;

  @Column("uuid")
  sender_id: string;

  @Column({ type: "text" })
  message: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ default: false })
  seen: boolean;
}