import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { ResearchArticlesModule } from './research-articles/research-articles.module';
import { EducationalInstitutionsModule } from './educational-institutions/educational-institutions.module';
import { PracticeReportsModule } from './practice-reports/practice-reports.module';
import { ReportsModule } from './reports/reports.module';
import { EducationalMaterialModule } from './educational-material/educational-material.module';
import { PostsModule } from './post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    HealthModule,
    AuthModule,
    ResearchArticlesModule,
    EducationalInstitutionsModule,
    PracticeReportsModule,
    ReportsModule,
    EducationalMaterialModule,
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
