import { UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Model } from 'mongoose';
import { WsGuard } from 'src/auth/guards/local.guard';
import { Notice, NoticeDocument } from 'src/notification/notification.schema';
import { UserDocument } from 'src/user/entity/user.schema';
import { Server } from 'ws';
import { PetitionSocketEnum, ISendEndorsement } from '../dto/petition.interface';
import { Petition, PetitionDocument } from '../schema/petition.schema';

@WebSocketGateway({ cors: true })
export class PetitionGateway implements OnGatewayConnection, OnGatewayInit {
  constructor(
    @InjectModel(Notice.name) private noticeModel: Model<NoticeDocument>,
    @InjectModel(Petition.name)
    private readonly PetitionModel: Model<PetitionDocument>,
  ) {}

  @WebSocketServer() public server: Server;

  handleConnection() {
    this.getPetitionNotice();
  }

  afterInit(server: Server) {
    this.server = server;
    this.getPetitionNotice();
  }

  // @UseGuards(WsGuard)
  // @SubscribeMessage('likePetition')
  // async likedPetition(
  //   @MessageBody() data: { id: string },
  //   @Req() req: ReqWithUser,
  //   @ConnectedSocket() client: Socket,
  // ): Promise<WsResponse<any>> {
  //   const payload = await this.PetitionService.like(data.id, req.user);

  //   client.emit('getPetition', payload);
  //   // const Petitions
  //   return {
  //     data: payload.likes.includes(req.user?.id) ? true : false,
  //     event: 'likePetition',
  //   };
  // }
  @UseGuards(WsGuard)
  @SubscribeMessage(PetitionSocketEnum.Created)
  async createdPetition(
    @MessageBody() data: { PetitionTitle: string; user: UserDocument },
  ) {
    const notice = await this.noticeModel.create({
      event: PetitionSocketEnum.Created,
      message: `${data?.user?.firstName} ${data?.user?.lastName} created a Petition ${data.PetitionTitle} `,
      user: data?.user?.id,
      db_model: 'Petition',
    });
    this.getPetitionNotice();
    return notice;
  }

  @UseGuards(WsGuard)
  @SubscribeMessage(PetitionSocketEnum.Created)
  async createdPetitionOrg(
    @MessageBody() data: { PetitionTitle: string; orgName: string, orgId: string },
  ) {
    const notice = await this.noticeModel.create({
      event: PetitionSocketEnum.Created,
      message: `${data?.orgName} created a Petition ${data.PetitionTitle} `,
      user: data?.orgId,
      db_model: 'Petition',
    });
    this.getPetitionNotice();
    return notice;
  }

  @SubscribeMessage(PetitionSocketEnum.Endorsed)
  async endorsedPetition(
    @MessageBody() data: { petitionTitle: string; user: UserDocument },
  ) {
    const notice = await this.noticeModel.create({
      event: PetitionSocketEnum.Created,
      message: `${data?.user?.firstName} ${data?.user?.lastName} endorsed a Petition ${data.petitionTitle}`,
      user: data?.user?.id,
      db_model: 'Petition',
    });
    this.getPetitionNotice();
    return notice;
  }
  @SubscribeMessage(PetitionSocketEnum.Get)
  async getPetitionNotice() {
    const Petitions = await this.noticeModel
      .find({ db_model: 'Petition' })
      .sort({ createdAt: -1 })
    return this.server.emit(PetitionSocketEnum.Get, Petitions);
  }
  @SubscribeMessage(PetitionSocketEnum.Get)
  async getAllNotice(model?: string) {
    if (!model) {
      const notices = await this.noticeModel
        .find()
        .sort({ createdAt: -1 })
      return this.server.emit('all', notices);
    } else {
      const notices = await this.noticeModel
        .find({ db_model: model })
        .sort({ createdAt: -1 })
      return this.server.emit('all', notices);
    }
  }
}
