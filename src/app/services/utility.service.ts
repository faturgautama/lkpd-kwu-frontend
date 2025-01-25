import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';
import 'moment/locale/id';
import domtoimage from 'dom-to-image';
import jspdf from 'jspdf';

@Injectable({
    providedIn: 'root'
})
export class UtilityService {

    ShowLoading$ = new BehaviorSubject(false);

    ShowSidebar$ = new BehaviorSubject(false);

    ShowTopMenu$ = new BehaviorSubject(false);

    constructor() { }

    getVersion(): string {
        return "0.37.1";
    }

    exportToPdf(divId: string, fileTitle: string) {
        const node = document.getElementById(divId);

        if (node) {
            domtoimage.toPng(node)
                .then((dataUrl) => {
                    // Generate the PDF
                    const pdf = new jspdf('p', 'mm', 'a4');
                    const imgProps = pdf.getImageProperties(dataUrl);
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                    pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);

                    // Open the PDF in a new window and trigger print
                    const pdfBlob = pdf.output('blob');
                    const pdfUrl = URL.createObjectURL(pdfBlob);
                    const pdfWindow: any = window.open(pdfUrl);

                    pdfWindow.onload = () => {
                        pdfWindow.focus();
                        pdfWindow.print();
                    };
                })
                .catch((error) => {
                    console.error('Error capturing the element:', error);
                });
        } else {
            console.error('Element not found:', divId);
        }
    }

    onFormatDate(date: Date, format?: string): any {
        moment.locale('id');
        return format ? moment(date).format(format) : moment(date).format('yyyy-mm-DD');
    }

    onCountJumlahHari(start: Date, end: Date): any {
        const startDate = moment(start),
            endDate = moment(end);

        return endDate.diff(startDate, 'days');
    }
}
