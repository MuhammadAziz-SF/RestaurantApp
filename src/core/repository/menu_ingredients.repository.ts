import { Repository } from "typeorm";
import { location } from '../entity/location.entity'

export type LocationRepository = Repository<location>