import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { DBService } from './db/db.service';
import { DbModule } from './db/db.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { ColumnModule } from './column/column.module';
import { DATABASE_URL } from '@/utils/constants';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      DATABASE_URL ||
        'mongodb://mongo:mongo@localhost:27017/gf-kanban?authSource=admin',
    ),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      debug: true,
    }),
    DbModule,
    UserModule,
    TaskModule,
    ColumnModule,
  ],
  controllers: [],
  providers: [DBService],
})
export class AppModule {}
