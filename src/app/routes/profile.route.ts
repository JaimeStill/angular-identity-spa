import {
    Component,
    OnInit
} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { FlexModule } from '../flex';
import { GraphProfile } from '../identity';
import { ProfileProperty } from '../components';

@Component({
    selector: 'profile-route',
    standalone: true,
    templateUrl: 'profile.route.html',
    imports: [
        FlexModule,
        ProfileProperty
    ]
})
export class ProfileRoute implements OnInit {
    profile?: GraphProfile;
    tokenExpiration!: string;

    constructor(
        private http: HttpClient
    ) { }

    ngOnInit(): void {
        this.http
            .get<GraphProfile>('https://graph.microsoft.com/v1.0/me')
            .subscribe((profile: GraphProfile) => this.profile = profile);

        this.tokenExpiration = localStorage.getItem('tokenExpiration')!;
    }
}
