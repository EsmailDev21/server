import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { Prisma, Report } from '@prisma/client';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  async create(@Body() data: Report) {
    return this.reportsService.creaeReport(data);
  }

  @Get()
  async findAll() {
    return this.reportsService.getReports();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.reportsService.getReportById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<Report>) {
    return this.reportsService.updateReport(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.reportsService.deleteReport(id);
  }
}
