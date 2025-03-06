import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MainComponent } from 'src/app/components/layout/main/main.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { Subject, takeUntil } from 'rxjs';
import { MateriService } from 'src/app/services/materi.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MateriModel } from 'src/app/model/materi.model';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { KelasService } from 'src/app/services/kelas.service';
import { KelasModel } from 'src/app/model/kelas.model';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-materi',
    standalone: true,
    imports: [
        CommonModule,
        MainComponent,
        FormsModule,
        ReactiveFormsModule,
        DropdownModule,
        InputTextModule,
        ButtonModule,
    ],
    templateUrl: './materi.component.html',
    styleUrl: './materi.component.scss'
})
export class MateriComponent implements OnInit, AfterViewInit, OnDestroy {

    Destroy$ = new Subject();

    MateriDatasource: any[] = [
        { id: 0, path: '../../../assets/materi/1.jpg' },
        { id: 1, path: '../../../assets/materi/2.jpg' },
        { id: 2, path: '../../../assets/materi/3.jpg' },
        { id: 3, path: '../../../assets/materi/4.jpg' },
        { id: 4, path: '../../../assets/materi/5.jpg' },
        { id: 5, path: '../../../assets/materi/6.jpg' },
        { id: 6, path: '../../../assets/materi/7.jpg' },
        { id: 7, path: '../../../assets/materi/8.jpg' },
        { id: 8, path: '../../../assets/materi/9.jpg' },
        { id: 9, path: '../../../assets/materi/10.jpg' },
        { id: 10, path: '../../../assets/materi/11.jpg' },
        { id: 11, path: '../../../assets/materi/12.jpg' },
        { id: 12, path: '../../../assets/materi/13.jpg' },
    ];

    SelectedMateri: any = this.MateriDatasource[0];
    SelectedMateriIndex: number = 0;

    constructor() { }

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {

    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    handleNextPrevMateri(action: 'prev' | 'next') {
        if (action == 'prev') {
            this.SelectedMateriIndex = this.SelectedMateriIndex - 1;
            this.SelectedMateri = this.MateriDatasource[this.SelectedMateriIndex];
        } else {
            this.SelectedMateriIndex = this.SelectedMateriIndex + 1;
            this.SelectedMateri = this.MateriDatasource[this.SelectedMateriIndex];
        }
    }
}
