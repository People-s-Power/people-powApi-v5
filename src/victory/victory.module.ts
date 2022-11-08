import { Module } from '@nestjs/common';
import { VictoryService } from './victory.service';
import { VictoryResolver } from './victory.resolver';

@Module({
  providers: [VictoryResolver, VictoryService]
})
export class VictoryModule {}
