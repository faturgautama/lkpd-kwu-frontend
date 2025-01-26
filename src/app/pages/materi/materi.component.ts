import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from 'src/app/components/layout/main/main.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-materi',
    standalone: true,
    imports: [
        MainComponent,
        FormsModule,
        ReactiveFormsModule,
        DropdownModule,
        InputTextModule,
    ],
    templateUrl: './materi.component.html',
    styleUrl: './materi.component.scss'
})
export class MateriComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    constructor() { }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }
}
