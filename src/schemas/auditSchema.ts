import { z } from 'zod';

export const auditFieldsSchema = z.object({
  createdAt: z.string().optional(),
  createdBy: z.string().max(50).optional(),
  updatedAt: z.string().optional(),
  updatedBy: z.string().max(50).optional(),
});

export type AuditFields = z.infer<typeof auditFieldsSchema>;
