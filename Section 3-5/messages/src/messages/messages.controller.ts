import { Controller, Get, Post, Param, Body, NotFoundException } from '@nestjs/common';
import { MessagesService } from './messages.service';

// DTOs Import
import { CreateMessageDto } from './dtos/create-message.dto';

@Controller('/messages')
export class MessagesController {
    constructor(public messagesService: MessagesService) {}

    @Get()
    async listMessages() {
        return this.messagesService.findAll();
    }

    @Post()
    async createMessage(@Body() body: CreateMessageDto) {
        return this.messagesService.create(body.content);
    }

    @Get('/:id')
    async getMessage(@Param('id') id: string) {
        const message = await this.messagesService.findOne(id);
        if (!message) {
            throw new NotFoundException('message not found');
        }
        return message;
    }
}
