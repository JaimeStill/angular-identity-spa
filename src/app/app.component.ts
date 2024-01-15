import {
    ChangeDetectorRef,
    Component,
    Inject,
    NgZone,
    OnDestroy,
    OnInit,
    WritableSignal,
    signal
} from '@angular/core';

import {
    Router,
    RouterLink,
    RouterOutlet
} from '@angular/router';

import {
    MSAL_GUARD_CONFIG,
    MsalBroadcastService,
    MsalGuardConfiguration,
    MsalModule,
    MsalService
} from '@azure/msal-angular';

import {
    AccountInfo,
    AuthenticationResult,
    EventMessage,
    EventType,
    InteractionStatus,
    RedirectRequest
} from '@azure/msal-browser';

import {
    filter,
    takeUntil
} from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Subject } from 'rxjs';
import { FlexModule } from './flex';
import { ThemeService } from './core';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        FlexModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MsalModule,
        RouterLink,
        RouterOutlet
    ],
    templateUrl: 'app.component.html',
    styleUrl: 'app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
    private readonly _destroying$ = new Subject<void>();

    account: WritableSignal<AccountInfo | null> = signal(null);
    isIframe = false;

    constructor(
        @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
        private msalBroadcastService: MsalBroadcastService,
        private authService: MsalService,
        private cdr: ChangeDetectorRef,
        private ngZone: NgZone,
        private router: Router,
        public themer: ThemeService
    ) { }

    ngOnInit(): void {
        this.isIframe = window !== window.parent && !window.opener;

        this.msalBroadcastService
            .inProgress$
            .pipe(
                filter((status: InteractionStatus) =>
                    status === InteractionStatus.None
                ),
                takeUntil(this._destroying$)
            )
            .subscribe(() => {
                this.account.set(
                    this.authService.instance.getActiveAccount()
                );

                this.cdr.detectChanges();
            });

        this.msalBroadcastService
            .msalSubject$
            .pipe(
                filter((msg: EventMessage) =>
                    msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS
                )
            )
            .subscribe((msg: EventMessage) =>
                localStorage.setItem('tokenExpiration', (msg.payload as any).expiresOn)
            );

        this.msalBroadcastService
            .msalSubject$
            .pipe(
                filter((msg: EventMessage) =>
                    msg.eventType === EventType.LOGIN_SUCCESS
                )
            )
            .subscribe((result: EventMessage) => {
                const payload = result.payload as AuthenticationResult;
                this.authService.instance.setActiveAccount(payload.account);
            });
    }

    ngOnDestroy(): void {
        this._destroying$.next(undefined);
        this._destroying$.complete();
    }

    login() {
        if (this.msalGuardConfig.authRequest)
            this.authService.loginRedirect(
                { ...this.msalGuardConfig.authRequest } as RedirectRequest
            );
        else
            this.authService.loginRedirect();
    }

    logout() {
        this.authService.logoutRedirect();
    }

    viewProfile() {
        this.ngZone.run(() => this.router.navigate(['profile']));
    }
}
