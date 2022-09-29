import { Resolver } from '@nestjs/graphql';
import { ActivitiesService } from './activities.service';

@Resolver('Activity')
export class ActivitiesResolver {
  constructor(private readonly activitiesService: ActivitiesService) {}
}
