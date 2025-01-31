export namespace NilaiModel {
    export interface INilai {
        id_kelas: number;
        kelas: string;
        id_siswa: number;
        no_absen: string;
        nama_lengkap: string;
        proyek: INilaiProyek[];
        kuis: INilaiKuis[];
    }

    export interface INilaiProyek {
        id_proyek: number;
        judul: string;
        kelompok_proyek: string;
        nilai_pertemuan_1: number;
        nilai_pertemuan_2: number;
        nilai_pertemuan_3: number;
        nilai_pertemuan_4: number;
        create_at: Date;
    }

    export interface INilaiKuis {
        id_kuis: number;
        judul: string;
        kategori_kuis: string;
        nilai: number;
        create_at: Date;
    }

    export class GetNilaiByKelas {
        status!: boolean;
        message!: string;
        data!: INilai[];
    }

    export class GetNilaiForSiswa {
        status!: boolean;
        message!: string;
        data!: INilai;
    }
}