import {
    Directive,
    ElementRef,
    Input,
    OnChanges,
    SimpleChanges
} from '@angular/core';

import {
    FxDirection,
    FxWrap,
    FxMain,
    FxCross,
    FxAlign
} from './flex';

@Directive({
    selector: '[flexContainer]',
    standalone: true
})
export class FlexContainerDirective implements OnChanges {
    // align-content
    @Input() flexAlign: FxAlign = 'normal';
    // align-items
    @Input() flexCross: FxCross = 'normal';
    // flex-direction
    @Input() flexDirection: FxDirection = 'row';
    // gap
    @Input() flexGap: string = 'normal';
    // justify-content
    @Input() flexMain: FxMain = 'normal';
    // flex-wrap
    @Input() flexWrap: FxWrap = 'nowrap';

    private style = () => this.el.nativeElement.style;

    constructor(private el: ElementRef) {
        this.style().display = 'flex';
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['flexDirection'])
            this.style().flexDirection = this.flexDirection;

        if (changes['flexWrap'])
            this.style().flexWrap = this.flexWrap;

        if (changes['flexMain'])
            this.style().justifyContent = this.flexMain;

        if (changes['flexCross'])
            this.style().alignItems = this.flexCross;

        if (changes['flexAlign'])
            this.style().alignContent = this.flexAlign;

        if (changes['flexGap'])
            this.style().gap = this.flexGap;
    }
}
