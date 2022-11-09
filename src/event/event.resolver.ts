import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser, GQLoginGuard } from 'src/auth/guards/graphql.guard';
import { UserDocument } from 'src/user/entity/user.schema';
import { EventService } from './event.service';

@Resolver('Event')
export class EventResolver {
  constructor(private readonly eventService: EventService) {}


  @Query('events')
  async findAll(@Args() { page, limit, filter }) {
    const events = await this.eventService.findAll(page, limit, filter)
    return events
  }



  @UseGuards(GQLoginGuard)
  @Mutation('createEvent')
  async createEvent(@Args() { name, description, time, startDate, endDate, imageFile, type }, @CurrentUser() user: UserDocument) {
    const event = await this.eventService.create({ name, description, time, startDate, endDate, imageFile, type }, user)
    return event
  }

  @UseGuards(GQLoginGuard)
  @Mutation('createEventOrg')
  async createEventOrg(@Args() { name, description, time, startDate, endDate, imageFile, type, authorId }) {
    const event = await this.eventService.createOrg({ name, description, time, startDate, endDate, imageFile, type }, authorId)
    return event
  }

  @UseGuards(GQLoginGuard)
  @Mutation()
  async updateEvent(@Args() { name, description, time, startDate, endDate, imageFile, type, eventId, authorId }){
    const event = await this.eventService.update({ name, description, time, startDate, endDate, imageFile, type }, eventId, authorId)
    return event
  }

  @UseGuards(GQLoginGuard)
  @Mutation('deleteEvent')
  async deleteEvent(@Args('eventId') eventId, @CurrentUser() user: UserDocument) {
    const event = await this.eventService.remove(eventId, user._id)
    return 'Removed'
  }
}
