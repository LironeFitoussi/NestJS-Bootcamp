import { Injectable } from "@nestjs/common";
import { MessagesRepository, Message } from "./messages.repository";

@Injectable()
export class MessagesService {
    constructor(public messagesRepo: MessagesRepository) {}

    async findOne(id: string): Promise<Message | undefined> {
        return this.messagesRepo.findOne(id);
    }

    async findAll(): Promise<Record<string, Message>> {
        return this.messagesRepo.findAll();
    }

    async create(message: string): Promise<Message> {
        return this.messagesRepo.create(message);
    }
} 