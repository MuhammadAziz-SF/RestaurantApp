import { Repository } from "typeorm";
import { reviews } from "../entity/reviews.entity";

export type ReviewsRepository = Repository<reviews>;
