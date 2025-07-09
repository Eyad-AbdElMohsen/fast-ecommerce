import { AdminGuard } from "./strategies/admin.guard";
import { AuthenticatedGuard } from "./strategies/auth.guard";

export const AuthGuards = {
    admin: AdminGuard,
    authenticated: AuthenticatedGuard
} as const