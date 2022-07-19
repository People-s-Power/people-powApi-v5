import { Response } from 'express';
import { TransactionService } from './transaction.service';
export declare class TransactionController {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    tx(): Promise<import("./transaction.schema").TransactionDocument[]>;
    verify(reference: string): Promise<import("./transaction.schema").TransactionDocument>;
    webhook(body: any, res: Response): Promise<Response<any, Record<string, any>>>;
    sendTxForCamp(param: any): Promise<import("./transaction.schema").TransactionDocument[]>;
}
