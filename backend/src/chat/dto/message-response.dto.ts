export class MessageResponseDto {
  id: string;
  content: string;
  userId: string;
  userName: string;
  projectId: string;
  isEdited: boolean;
  isDeleted: boolean;
  createdAt: Date;
  editedAt: Date;
}
