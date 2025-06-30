import { Repository } from "typeorm";
import { Categories } from "../entity/categories.entity";

export type CategoryRepository = Repository<Categories>;
