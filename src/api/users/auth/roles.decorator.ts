import { SetMetadata } from "@nestjs/common";
import { UserRole } from "../../../common/enum/base.enum";
export const Roles = (...roles: UserRole[]) => SetMetadata("roles", roles);
