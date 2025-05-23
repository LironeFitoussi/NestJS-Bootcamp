import { Module } from '@nestjs/common';
import { MessagesController } from './src/messages/messages.controller';

@Module({
  controllers: [MessagesController]
})
export class MessagesModule {}
