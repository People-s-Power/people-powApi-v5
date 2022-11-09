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

  @Query('authorEvents')
  async authorEvents(authorId, page, limit, filter) {
    console.log(authorId, page, limit, filter)
    const event = await this.eventService.findAll(page, limit, filter, authorId)
    return event
  }

  @Query()
  async event(@Args('eventId') eventId) {
    const event = await this.eventService.findOne(eventId)
    return event
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
  async interested(@Args() { eventId, authorId, authorImg, name }) {
    const event = await this.eventService.interested(eventId, authorId, authorImg, name)
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
