import { inject } from "@angular/core";
import { Router } from "@angular/router";

export const AuthGuard = () => {
    const userData = localStorage.getItem("_LPKDUD_");

    const router = inject(Router);

    if (userData) {
        return true;
    }

    return router.navigate(['']);
}