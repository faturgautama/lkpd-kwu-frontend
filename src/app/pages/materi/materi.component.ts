import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from 'src/app/components/layout/main/main.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { Subject } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Howl, Howler } from 'howler';

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

    StartSound = false;

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

    Sound = new Howl({
        src: ['../../../../assets/voice/voice-background.mp3'],
        loop: false,
    });

    constructor() { }

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            if (!this.StartSound) {
                this.StartSound = true;
                this.Sound.play();
            };
        }, 1500);
    }

    ngOnDestroy(): void {
        this.StartSound = false;
        this.Sound.stop();
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
