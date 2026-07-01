import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { OpportunitesService } from './opportunites.service';
import { CreateOpportuniteDto } from './dto/create-opportunite.dto';
import { UpdateOpportuniteDto } from './dto/update-opportunite.dto';
import { FilterOpportuniteDto } from './dto/filter-opportunite.dto';

@Controller('opportunites')
export class OpportunitesController {
  constructor(private readonly opportunitesService: OpportunitesService) {}

  @Post()
  create(@Body() dto: CreateOpportuniteDto) {
    return this.opportunitesService.create(dto);
  }

  @Get('pipeline/recap')
  recapPipeline() {
    return this.opportunitesService.recapPipeline();
  }

  @Get()
  findAll(@Query() filter: FilterOpportuniteDto) {
    return this.opportunitesService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.opportunitesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateOpportuniteDto) {
    return this.opportunitesService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.opportunitesService.remove(id);
  }
}