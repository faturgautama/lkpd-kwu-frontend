export namespace MateriModel {
    export interface IMateri {
        id_materi: number;
        id_kelas: number;
        kelas: string;
        judul: string;
        file_name: string;
        file_base_64?: string;
        create_at: Date;
        create_by: number;
        update_at?: Date;
        update_by?: number;
    }

    export interface IMateriQueryParams {
        id_kelas?: number;
        judul?: string;
    }

    export class GetAllMateri {
        status!: boolean;
        message!: string;
        data!: IMateri[]
    }

    export class GetByIdMateri {
        status!: boolean;
        message!: string;
        data!: IMateri;
    }

    export interface CreateMateri {
        id_kelas: number;
        judul: string;
        file_name: string;
        file_base_64: string;
    }

    export interface UpdateMateri {
        id_materi: number;
        id_kelas: number;
        judul: string;
        file_name: string;
        file_base_64: string;
    }
}