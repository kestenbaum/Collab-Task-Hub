import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import {
  CreateProjectDto,
  UpdateProjectDto,
  AddMemberDto,
  UpdateMemberRoleDto,
} from './dto/project.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  /**
   * Create a new project
   * POST /projects
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createProjectDto: CreateProjectDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.projectsService.create(createProjectDto, userId);
  }

  /**
   * Get all projects where user is a member
   * GET /projects
   */
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAll(@CurrentUser('id') userId: string) {
    return this.projectsService.findAll(userId);
  }

  /**
   * Get all projects (admin endpoint)
   * GET /projects/all
   */
  @Get('all')
  @ApiOperation({
    summary: 'Get all projects',
    description: 'Retrieve all projects in the system (admin/debug endpoint)',
  })
  @ApiResponse({ status: 200, description: 'Returns all projects' })
  findAllProjects() {
    return this.projectsService.findAllProjects();
  }

  /**
   * Get a single project by ID
   * GET /projects/:id
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findOne(@Param('id') id: string, @CurrentUser('id') userId: string) {
    const project = await this.projectsService.findOne(id);

    // Check if user is a member
    const isMember = await this.projectsService.checkMembership(id, userId);
    if (!isMember) {
      throw new Error('You are not a member of this project');
    }

    return project;
  }

  /**
   * Update a project
   * PATCH /projects/:id
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.projectsService.update(id, updateProjectDto, userId);
  }

  /**
   * Delete a project
   * DELETE /projects/:id
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @CurrentUser('id') userId: string) {
    await this.projectsService.remove(id, userId);
  }

  /**
   * Add a member to the project
   * POST /projects/:id/members
   */
  @Post(':id/members')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  addMember(
    @Param('id') projectId: string,
    @Body() addMemberDto: AddMemberDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.projectsService.addMember(projectId, addMemberDto, userId);
  }

  /**
   * Remove a member from the project
   * DELETE /projects/:id/members/:memberId
   */
  @Delete(':id/members/:memberId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeMember(
    @Param('id') projectId: string,
    @Param('memberId') memberId: string,
    @CurrentUser('id') userId: string,
  ) {
    await this.projectsService.removeMember(projectId, memberId, userId);
  }

  /**
   * Update member role
   * PATCH /projects/:id/members/:memberId
   */
  @Patch(':id/members/:memberId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  updateMemberRole(
    @Param('id') projectId: string,
    @Param('memberId') memberId: string,
    @Body() updateMemberRoleDto: UpdateMemberRoleDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.projectsService.updateMemberRole(
      projectId,
      memberId,
      updateMemberRoleDto,
      userId,
    );
  }

  /**
   * Get user's role in a project
   * GET /projects/:id/role
   */
  @Get(':id/role')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getUserRole(
    @Param('id') projectId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.projectsService.getUserRole(projectId, userId);
  }
}
