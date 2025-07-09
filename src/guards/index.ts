import { AdminGuard } from "./admin.guard";
import { AuthenticatedGuard } from "./auth.guard";

export const AuthGuards = {
    admin: AdminGuard,
    authenticated: AuthenticatedGuard
} as const