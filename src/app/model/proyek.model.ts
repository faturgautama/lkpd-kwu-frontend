export namespace ProyekModel {
    export interface IProyek {
        id_proyek: number;
        id_kelas: number;
        kelas: string;
        judul: string;
        deskripsi: string;
        create_at: Date;
        create_by: number;
        is_active: boolean;
    }

    export interface IKelompokProyek {
        id_kelompok_proyek: number;
        kelompok_proyek: string;
        id_proyek: number;
        judul_proyek: string;
        hasil: string;
        nilai_pertemuan_1: number;
        nilai_pertemuan_2: number;
        nilai_pertemuan_3: number;
        nilai_pertemuan_4: number;
        create_at: Date;
        create_by: number;
        update_at: Date;
        update_by: number;
        is_active: boolean;
        detail_siswa: ISiswaKelompokProyek[]
    }

    export interface ISiswaKelompokProyek {
        id_siswa_kelompok_proyek: number;
        id_kelompok_proyek: number;
        kelompok_proyek: string;
        id_user: number;
        id_siswa: number;
        no_absen: string;
        nama_lengkap: string;
    }

    export interface IProyekWithDetail {
        id_proyek: number;
        id_kelas: number;
        kelas: string;
        judul: string;
        deskripsi: string;
        create_at: Date;
        create_by: number;
        is_active: boolean;
        kelompok_proyek: IKelompokProyek[]
    }

    export interface IProyekQueryParams {
        id_kelas?: number;
        judul?: string;
        kelompok_proyek?: string;
        id_siswa?: number;
    }

    export interface GetAllProyek {
        status: boolean;
        message: string;
        data: IProyek[]
    }

    export class GetByIdProyek {
        status!: boolean;
        message!: string;
        data!: IProyekWithDetail;
    }

    export interface CreateNewProyekKelompok {
        id_proyek: number;
        kelompok_proyek: string;
        detail_siswa: CreateProyekSiswaKelompok[]
    }

    export interface CreateProyekKelompok {
        kelompok_proyek: string;
        detail_siswa: CreateProyekSiswaKelompok[]
    }

    export interface CreateProyekSiswaKelompok {
        id_user: number;
        id_siswa: number;
    }

    export interface CreateProyek {
        id_kelas: number;
        judul: string;
        deskripsi: string;
        kelompok: CreateProyekKelompok[]
    }

    export interface UpdateProyek {
        id_proyek: number;
        id_kelas: number;
        judul: string;
        deskripsi: string;
    }

    export interface UpdateNilaiProyekKelompok {
        id_kelompok_proyek: string;
        nilai_pertemuan_1: number;
        nilai_pertemuan_2: number;
        nilai_pertemuan_3: number;
        nilai_pertemuan_4: number;
    }

    export interface UpdateProyekKelompok {
        id_kelompok_proyek: string;
        kelompok_proyek: string;
        hasil: string;
    }

    export interface UpdateProyekSiswaKelompok {
        id_siswa_kelompok_proyek: number;
        id_user: number;
        id_siswa: number;
    }

    export interface CreateNewProyekSiswaKelompok {
        id_kelompok_proyek: number;
        id_user: number;
        id_siswa: number;
    }
}