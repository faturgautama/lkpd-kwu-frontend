import { Component } from '@angular/core';
import { MainComponent } from 'src/app/components/layout/main/main.component';

@Component({
    selector: 'app-beranda',
    standalone: true,
    imports: [
        MainComponent,
    ],
    templateUrl: './beranda.component.html',
    styleUrl: './beranda.component.scss'
})
export class BerandaComponent {

}
