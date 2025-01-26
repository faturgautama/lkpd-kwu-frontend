export namespace ReferensiModel {
    export interface IReferensi {
        id_referensi: number;
        judul: string;
        deskripsi: string;
        link: string;
        create_at: Date;
        create_by: number;
    }

    export interface IReferensiQueryParams {
        judul?: string;
    }

    export class GetAllReferensi {
        status!: boolean;
        message!: string;
        data!: IReferensi[]
    }

    export class GetByIdReferensi {
        status!: boolean;
        message!: string;
        data!: IReferensi;
    }

    export interface CreateReferensi {
        judul: string;
        deskripsi: string;
        link: string;
    }

    export interface UpdateReferensi {
        id_referensi: number;
        judul: string;
        deskripsi: string;
        link: string;
    }
}