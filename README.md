# Angular Identity Spa

This project implements the [MSAL.js Angular Quickstart](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-single-page-app-angular-sign-in) with Angular 17 with standalone components. I understand that the [MSAL Angular v3](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/package.json) library dependencies are targeting Angular 15, and [Angular 17 is not officially supported](https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/6719#issuecomment-1886044786), but I'm stubborn and have it working with some caveats. The [Angular Standalone Sample](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/samples/msal-angular-v3-samples/angular-standalone-sample) was incredibly helpful with regard to helping me get this working properly.

https://github.com/JaimeStill/angular-identity-spa/assets/14102723/02ef9460-8058-499a-a042-f0f7e4d295ac

## Setup

* [identity](./src/app/identity) contains all of the custom MSAL configuration, with Entra app configuration specified in [environment](./src/environments/environment.ts).
* [main.ts](./src/main.ts) bootstraps `MsalRedirectComponent` after the initial `bootstrapApplication` is complete.
* [index.html](./src/index.html) renders the `<app-redirect></app-redirect>` component.
* [app.config.ts](./src/app/app.config.ts) calls `provideHttpClient(withInterceptorsFromDi())` and `provideMsal()`.
* [app.routes.ts](./src/app/app.routes.ts) restricts the `profile` route with `MsalGuard`.
* [AppComponent](./src/app/app.component.ts) handles all of the account state management.
* [ProfileComponent](./src/app/routes/profile.route.ts) makes the call to the Microsoft Graph API and renders the results.

## Caveats

In order for the [control flow](./src/app/app.component.html#L7) statement to work with the [account signal](./src/app/app.component.ts#L67), a call to [`ChangeDetectorRef.detectChanges()`](./src/app/app.component.ts#L93) is required.

> Without this in place, the control flow will detect the change whenever another change initiating action is taken, e.g., toggling the app theme.

When using `routerLink` to route to the `profile` route, the following warning would show in the console:

*Navigation triggered outside Angular zone, did you forget to call `ngZone.run()`?*

This would also cause the `ngOnInit` logic to not execute, leaving just the header and description rendered. However, whenever manually navigating to the `profile` route, the route would render the way it was intended to.

To fix this, I changed the [view profile button](./src/app/app.component.html#L13) to use a click event instead of `routerLink`, and wrap the call to [`router.navigate`](./src/app/app.component.ts#L139) in `ngZone.run`.
