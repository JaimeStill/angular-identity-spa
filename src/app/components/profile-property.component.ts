import { Component, Input } from '@angular/core';

@Component({
    selector: 'profile-property',
    standalone: true,
    templateUrl: 'profile-property.component.html'
})
export class ProfileProperty {
    @Input({ required: true }) label!: string;
    @Input({ required: true }) value: string | undefined;
}
