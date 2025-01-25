export namespace AuthenticationModel {
    export interface ILogin {
        email: string;
        password: string;
    }

    export interface ILoginResponse {
        id_user: number;
        is_guru: boolean;
        nama_lengkap: string;
        id_sekolah: number;
        nama_sekolah: string;
        id_kelas?: number;
        nama_kelas?: string;
        nip?: string;
        no_absen?: string;
        email: string;
        token: string;
    }

    export class Login {
        status!: boolean;
        message!: string;
        data!: ILoginResponse;
    }

    export interface IRegister {
        nama_lengkap: string;
        email: string;
        password: string;
        is_guru: boolean;
    }

    export interface IProfile {
        id_user?: number;
        id_siswa?: number;
        id_guru?: number;
        nama_lengkap: string;
        no_absen?: string;
        nip?: string;
        email: string;
        password: string;
    }

    export class GetProfile {
        status!: boolean;
        message!: string;
        data!: IProfile;
    }

    export interface UpdateProfile {
        nama_lengkap: string;
        no_absen?: string;
        nip?: string;
        email: string;
        password: string;
    }
}