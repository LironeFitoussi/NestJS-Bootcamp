import { Injectable } from "@nestjs/common";
import { readFile, writeFile } from 'fs/promises';

export interface Message {
    id: string;
    content: string;
}

@Injectable()
export class MessagesRepository {
    private async readMessagesFile() {
        const messagesData = await readFile('messages.json', 'utf-8');
        return JSON.parse(messagesData);
    }

    async findOne(id: string) {
        const messages = await this.readMessagesFile();
        return messages[id];
    }

    async findAll() {
        return this.readMessagesFile();
    }

    async create(message: string) {
        const messages = await this.readMessagesFile();
        const id = Math.floor(Math.random() * 999999);

        messages[id] = { id, content: message };
        
        await writeFile('messages.json', JSON.stringify(messages, null, 2));
        return messages[id];
    }
}