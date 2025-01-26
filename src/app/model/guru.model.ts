export namespace GuruModel {
    export interface IGuru {
        id_guru: number;
        nama_lengkap: string;
        nip: string;
        id_sekolah: number;
        nama_sekolah: string;
        is_active: boolean;
        create_at: Date;
    }

    export class GetAllGuru {
        status!: boolean;
        message!: string;
        data!: IGuru[]
    }

    export class GetByIdGuru {
        status!: boolean;
        message!: string;
        data!: IGuru;
    }

    export interface CreateGuru {
        nama_lengkap: string;
        nip: string;
        id_sekolah: number;
    }

    export interface UpdateGuru {
        id_guru: number;
        nama_lengkap: string;
        nip: string;
        id_sekolah: number;
        is_active: boolean;
    }
}