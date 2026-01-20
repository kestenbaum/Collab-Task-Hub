import {
  Controller,
  Get,
  Delete,
  Patch,
  Param,
  Query,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { EditMessageDto } from './dto/edit-message.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('chat')
@ApiBearerAuth()
@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get('projects/:projectId/messages')
  async getProjectMessages(
    @Param('projectId') projectId: string,
    @CurrentUser('id') userId: string,
    @Query('limit') limit?: number,
    @Query('before') before?: string,
  ) {
    return this.chatService.getProjectMessages(
      projectId,
      userId,
      limit ? +limit : 200,
      before,
    );
  }

  @Patch('messages/:messageId')
  async editMessage(
    @Param('messageId') messageId: string,
    @Body() editMessageDto: EditMessageDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.chatService.editMessage(
      messageId,
      editMessageDto.content,
      userId,
    );
  }

  @Delete('messages/:messageId')
  async deleteMessage(
    @Param('messageId') messageId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.chatService.deleteMessage(messageId, userId);
  }
}
