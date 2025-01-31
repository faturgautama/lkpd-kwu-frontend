import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ProyekService } from 'src/app/services/proyek.service';
import domtoimage from 'dom-to-image';
import jspdf from 'jspdf';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
    selector: 'app-download-proyek',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './download-proyek.component.html',
    styleUrl: './download-proyek.component.scss'
})
export class DownloadProyekComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    Proyek: any;

    Hasil: any;

    constructor(
        private _proyekService: ProyekService,
        private _utilityService: UtilityService,
        private _activatedRoute: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        const id_proyek = this._activatedRoute.snapshot.queryParams['id_proyek'],
            id_siswa = this._activatedRoute.snapshot.queryParams['id_siswa'];

        this._proyekService
            .getById(id_proyek)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this.Proyek = result.data;
                }
            });

        this._proyekService
            .getDetailKelompok(id_siswa, id_proyek)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this.Hasil = result.data;
                }
            });

        setTimeout(() => {
            this.onExportPdf();
        }, 2000);
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    private onExportPdf() {
        this._utilityService.ShowLoading$.next(true);

        const node = document.getElementById("downloadProyek");

        if (node) {
            const scaleFactor = 3; // Increase resolution (higher = better quality)

            const options = {
                width: node.offsetWidth * scaleFactor,
                height: node.offsetHeight * scaleFactor,
                style: {
                    transform: `scale(${scaleFactor})`,
                    transformOrigin: "top left",
                    width: `${node.offsetWidth * scaleFactor}px`,
                    height: `${node.offsetHeight * scaleFactor}px`
                }
            };

            domtoimage.toPng(node, options)
                .then((dataUrl) => {
                    // Generate the PDF
                    const pdf = new jspdf('p', 'mm', 'a4');
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = pdf.internal.pageSize.getHeight();

                    // Adjust image to A4 dimensions while maintaining aspect ratio
                    const imgProps = pdf.getImageProperties(dataUrl);
                    const imgWidth = pdfWidth; // Fit to page width
                    const imgHeight = (imgProps.height * imgWidth) / imgProps.width; // Maintain aspect ratio

                    pdf.addImage(dataUrl, 'PNG', 0, 0, imgWidth, imgHeight);

                    // Save the PDF
                    pdf.save(`${this.Proyek.judul}.pdf`);
                    this._utilityService.ShowLoading$.next(false);

                    setTimeout(() => {
                        window.history.back();
                    }, 100);
                })
                .catch((error) => {
                    console.error('Error capturing the element:', error);
                });
        } else {
            console.error('Element not found');
        }
    }
}
