import { z } from 'zod';
import { auditFieldsSchema } from './auditSchema';

export const permissionSchema = z
  .object({
    permissionId: z.string().max(50),
    permissionName: z.string().max(100),
  })
  .extend(auditFieldsSchema.shape);

export type Permission = z.output<typeof permissionSchema>;

export const permissionGroupSchema = z
  .object({
    groupId: z.string().max(50),
    permissionId: z.string().max(50),
  })
  .extend(auditFieldsSchema.shape);

export type PermissionGroup = z.output<typeof permissionGroupSchema>;

export const userGroupMappingSchema = z
  .object({
    userGroupMappingId: z.number().optional(),
    userId: z.string().max(50),
    groupId: z.string().max(50),
  })
  .extend(auditFieldsSchema.shape);

export type UserGroupMapping = z.output<typeof userGroupMappingSchema>;
