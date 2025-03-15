import type { IContact } from "../entities/Contact";
import type { ILink } from "../entities/Link";
import type { IProduct } from "../entities/Product";
import type { IService } from "../entities/Service";
import type { ITeamMember } from "../entities/TeamMember";

export type TEntitie = IContact | ILink | IProduct | IService | ITeamMember;
