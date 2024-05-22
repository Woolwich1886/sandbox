
import { Injectable } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
/**
 * https://angular-material.dev/articles/mat-icon-svg
 */
@Injectable({ providedIn: 'root' })
export class IconRegistyService {
    constructor(iconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
        iconRegistry.addSvgIcon('code', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/code_blocks.svg'));
        iconRegistry.addSvgIcon('home', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/home.svg'));
        iconRegistry.addSvgIcon('pencil', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/pencil.svg'));
        iconRegistry.addSvgIcon('help', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/help.svg'));
        iconRegistry.addSvgIcon('delete', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/delete.svg'));
        iconRegistry.addSvgIcon('send', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/send.svg'));
    }
}