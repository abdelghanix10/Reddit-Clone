import type { User } from "./auth";


export function can(user: User, permission: string): boolean {
    return user.permissions.includes(permission);
}