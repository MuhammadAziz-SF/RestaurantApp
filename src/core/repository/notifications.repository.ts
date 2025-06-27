import { Repository } from "typeorm";
import { NotificationEntity } from "../entity/notifications.entity";

export type NotificationEntityRepository = Repository<NotificationEntity>;
