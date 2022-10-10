import { Model } from 'mongoose';
import { PetitionDocument } from 'src/petition/schema/petition.schema';
import { TransactionPaymentResponse } from './transaction.interface';
import { TransactionDocument } from './transaction.schema';
export declare class TransactionService {
    private readonly transactionModel;
    private readonly PetitionModel;
    constructor(transactionModel: Model<TransactionDocument>, PetitionModel: Model<PetitionDocument>);
    webhook(e: TransactionPaymentResponse): Promise<boolean>;
    verifyPayment(reference: string): Promise<TransactionDocument>;
    sendTxForCamp(campId: string): Promise<TransactionDocument[]>;
    sendTx(): Promise<TransactionDocument[]>;
}
