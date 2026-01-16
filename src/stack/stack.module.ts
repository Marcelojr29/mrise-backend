import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StackController } from './stack.controller';
import { StackService } from './stack.service';
import { Technology, TechnologySchema } from './schemas/technology.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Technology.name, schema: TechnologySchema },
    ]),
  ],
  controllers: [StackController],
  providers: [StackService],
})
export class StackModule {}
