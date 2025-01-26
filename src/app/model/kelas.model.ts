export namespace KelasModel {
    export interface IKelas {
        id_kelas: number;
        kelas: string;
        id_sekolah: number;
        nama_sekolah: string;
        is_active: boolean;
        create_at: Date;
    }

    export class GetAllKelas {
        status!: boolean;
        message!: string;
        data!: IKelas[]
    }

    export class GetByIdKelas {
        status!: boolean;
        message!: string;
        data!: IKelas;
    }

    export interface CreateKelas {
        kelas: string;
        id_sekolah: number;
    }

    export interface UpdateKelas {
        id_kelas: number;
        kelas: string;
        id_sekolah: number;
        is_active: boolean;
    }
}