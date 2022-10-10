import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Petition, PetitionSchema } from 'src/petition/schema/petition.schema';
import { TransactionController } from './transaction.controller';
import { Transaction, TransactionSchema } from './transaction.schema';
import { TransactionService } from './transaction.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
      { name: Petition.name, schema: PetitionSchema },
    ]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
