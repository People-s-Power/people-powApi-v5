import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import {
  Petition,
  PetitionDocument,
} from 'src/petition/schema/petition.schema';
import config from 'src/utils/config';
import {
  PaymentPurposeEnum,
  TransactionPaymentResponse,
} from './transaction.interface';
import { Transaction, TransactionDocument } from './transaction.schema';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<TransactionDocument>,
    @InjectModel(Petition.name)
    private readonly PetitionModel: Model<PetitionDocument>,
  ) {}

  async webhook(e: TransactionPaymentResponse) {
    try {
      const transaction = await this.transactionModel.create({
        ...e.data,
        transactionId: e.data.id,
        purpose: e.data.metadata?.purpose,
        key: e.data.metadata?.key,
        name: e.data.metadata?.name,
        message: `${e.data.metadata?.name} ${e.data.metadata?.purpose}`
      });
      console.log(e)
      console.log(transaction)
      if (transaction.purpose === PaymentPurposeEnum.VIEWS || transaction.purpose === PaymentPurposeEnum.ENDORSEMENT) {
        await this.PetitionModel
          .findByIdAndUpdate(
            transaction.key,
            {
              $set: { promoted: true },
            },
            { new: true },
          )
          .catch((e) => {
            throw e;
          });
      }
      const _id = e.data.metadata.key
      let value
      const Petition = await this.PetitionModel.findById(_id)
      if(transaction.purpose === PaymentPurposeEnum.VIEWS) {
        value = e.data.metadata?.numberOfViews
        const numViews = parseInt(value)
        Petition.numberOfPaidViewsCount += numViews
        await Petition.save()
        return true
      }

      value = e.data.metadata?.numberOfEndorsements
      const numEd = parseInt(value)
      Petition.numberOfPaidEndorsementCount += numEd
      await Petition.save()

      return true;
    } catch (error) {
      throw error;
    }
  }
  async verifyPayment(reference: string): Promise<TransactionDocument> {
    try {
      const { data } = await axios.get(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${config.PAYSTACK_SK}`,
          },
        },
      );
      const res = data as TransactionPaymentResponse;
      const transaction = await this.transactionModel.create({
        ...res.data,
        transactionId: res.data.id,
        purpose: res.data.metadata?.purpose,
        key: res.data.metadata?.key,
        name: res.data.metadata.name
      });
      if (transaction.purpose === PaymentPurposeEnum.VIEWS || transaction.purpose === PaymentPurposeEnum.ENDORSEMENT) {
        await this.PetitionModel
          .findByIdAndUpdate(
            transaction.key,
            {
              $set: { promoted: true },
            },
            { new: true },
          )
          .catch((e) => {
            throw e;
          });
      }
      return transaction;
    } catch (error) {
      console.log(error);
      throw error;
    }
    // const transaction = await this.transactionModel.create({ ...data, transactionId: data.message });
  }

  // Tansactions for a single camp
  async sendTxForCamp(campId: string): Promise<TransactionDocument[]> {
    const tx = await this.transactionModel.find({ key: campId })
    return tx
  }

  // Send all transactions
  async sendTx(): Promise<TransactionDocument[]> {
    const tx = await this.transactionModel.find()
    return tx
  }
}
