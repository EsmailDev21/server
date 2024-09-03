import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Report, Prisma } from '@prisma/client';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async creaeReport(data: Report) {
    const report = await this.prisma.report.create({
      data: {
        ...data,
      },
    });

    return report;
  }

  async getReports(): Promise<Report[]> {
    return this.prisma.report.findMany();
  }

  async getReportById(id: string) {
    return this.prisma.report.findUnique({ where: { id } });
  }

  async updateReport(id: string, data: Partial<Report>) {
    return this.prisma.report.update({
      where: { id },
      data: {
        ...data,
      },
    });
  }

  async deleteReport(id: string) {
    return this.prisma.report.delete({ where: { id } });
  }
}
