export namespace SekolahModel {
    export interface ISekolah {
        id_sekolah: number;
        nama_sekolah: string;
        alamat: string;
        no_telepon: string;
        kode_pos: string;
        is_active: boolean;
    }

    export class GetAllSekolah {
        status!: boolean;
        message!: string;
        data!: ISekolah[]
    }

    export class GetByIdSekolah {
        status!: boolean;
        message!: string;
        data!: ISekolah;
    }

    export interface CreateSekolah {
        nama_sekolah: string;
        alamat: string;
        no_telepon: string;
        kode_pos: string;
    }

    export interface UpdateSekolah {
        id_sekolah: number;
        nama_sekolah: string;
        alamat: string;
        no_telepon: string;
        kode_pos: string;
        is_active: boolean;
    }
}