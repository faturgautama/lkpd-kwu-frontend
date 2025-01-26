export namespace KuisModel {
    export interface IKuis {
        id_kuis: number;
        id_kelas: number;
        kelas: string;
        judul: string
        start_date?: Date;
        end_date?: Date;
        kategori_kuis: string;
        deskripsi: string;
        create_at: Date;
        create_by: number;
        update_at: Date;
        update_by: number;
        is_active: boolean;
    }

    export interface IPertanyaanKuis {
        id_kuis: number;
        id_pertanyaan: number;
        pertanyaan: string;
        option_a: string;
        option_b: string;
        option_c: string;
        option_d: string;
        option_e: string;
        correct: string;
        create_at: Date;
        create_by: number;
    }

    export interface IJawabanKuis {
        id_jawaban: number;
        id_pertanyaan: number;
        pertanyaan: string;
        id_siswa: number;
        no_absen: string;
        nama_lengkap: string;
        jawaban: string;
    }

    export interface IKuisWithDetail {
        id_kuis: number;
        id_kelas: number;
        kelas: string;
        judul: string
        start_date?: Date;
        end_date?: Date;
        kategori_kuis: string;
        deskripsi: string;
        create_at: Date;
        create_by: number;
        update_at: Date;
        update_by: number;
        is_active: boolean;
        pertanyaan: IPertanyaanKuis[]
    }

    export interface IKuisQueryParams {
        id_kelas?: number;
    }

    export class GetAllKuis {
        status!: boolean;
        message!: string;
        data!: IKuis[]
    }

    export class GetByIdKuis {
        status!: boolean;
        message!: string;
        data!: IKuisWithDetail;
    }

    export interface CreatePertanyaanKuis {
        pertanyaan: string;
        option_a: string;
        option_b: string;
        option_c: string;
        option_d: string;
        option_e: string;
        correct: string;
    }

    export interface CreateKuis {
        id_kelas: number;
        judul: string
        start_date?: Date;
        end_date?: Date;
        kategori_kuis: string;
        deskripsi: string;
        pertanyaan: CreatePertanyaanKuis[]
    }

    export interface UpdateKuis {
        id_kuis: number;
        id_kelas: number;
        judul: string
        start_date?: Date;
        end_date?: Date;
        kategori_kuis: string;
        deskripsi: string;
        is_active: boolean;
    }

    export interface UpdatePertanyaanKuis {
        id_pertanyaan: number;
        pertanyaan: string;
        option_a: string;
        option_b: string;
        option_c: string;
        option_d: string;
        option_e: string;
        correct: string;
    }

    export interface CreateNewPertanyaanKuis {
        id_kuis: number;
        pertanyaan: string;
        option_a: string;
        option_b: string;
        option_c: string;
        option_d: string;
        option_e: string;
        correct: string;
    }

    export interface CreateJawabanKuis {
        id_pertanyaan: number;
        id_siswa: number;
        jawaban: string;
    }
}