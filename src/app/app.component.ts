import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'lkpd-kwu-frontend';

    ngOnInit() {
        this.lockOrientation();
    }

    async lockOrientation() {

    }
}
