import { z } from 'zod';

/** 서버 UserRole enum 과 짝을 이룬다. */
export const userRoleSchema = z.enum(['ADMIN', 'READER']);

export type UserRole = z.infer<typeof userRoleSchema>;

/**
 * 인증된 사용자.
 *
 * 서버가 내려주는 값 그대로이며, 비밀번호·로그인 실패 횟수 같은 값은 포함되지 않는다.
 */
export const authUserSchema = z.object({
  userId: z.string().min(1),
  userName: z.string().min(1),
  role: userRoleSchema,
});

export type AuthUser = z.output<typeof authUserSchema>;

/**
 * 로그인 입력.
 *
 * 길이 정책은 서버가 판단한다. 여기서 최소 길이를 강제하면 정책이 바뀔 때마다
 * 두 곳을 고쳐야 하고, 기존 계정이 로그인하지 못하는 상황도 생긴다.
 */
export const signInSchema = z.object({
  userId: z.string().min(1, '아이디를 입력해주세요.').max(50),
  userPassword: z.string().min(1, '비밀번호를 입력해주세요.').max(72),
});

export type SignInInput = z.output<typeof signInSchema>;

export const loginResponseSchema = z.object({
  accessToken: z.string().min(1),
  expiresInSeconds: z.number().int().positive(),
  user: authUserSchema,
});

export type LoginResponse = z.output<typeof loginResponseSchema>;
