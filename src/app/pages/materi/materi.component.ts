import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from 'src/app/components/layout/main/main.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { Subject } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Howl, Howler } from 'howler';

@Component({
    selector: 'app-materi',
    standalone: true,
    imports: [
        CommonModule,
        MainComponent,
        FormsModule,
        ReactiveFormsModule,
        DropdownModule,
        InputTextModule,
        ButtonModule,
    ],
    templateUrl: './materi.component.html',
    styleUrl: './materi.component.scss'
})
export class MateriComponent implements OnInit, AfterViewInit, OnDestroy {

    Destroy$ = new Subject();

    StartSound = false;

    MateriDatasource: any[] = [
        { id: 0, path: '../../../assets/materi/1.jpg' },
        { id: 1, path: '../../../assets/materi/2.jpg' },
        { id: 2, path: '../../../assets/materi/3.jpg' },
        { id: 3, path: '../../../assets/materi/4.jpg' },
        { id: 4, path: '../../../assets/materi/5.jpg' },
        { id: 5, path: '../../../assets/materi/6.jpg' },
        { id: 6, path: '../../../assets/materi/7.jpg' },
        { id: 7, path: '../../../assets/materi/8.jpg' },
        { id: 8, path: '../../../assets/materi/9.jpg' },
        { id: 9, path: '../../../assets/materi/10.jpg' },
        { id: 10, path: '../../../assets/materi/11.jpg' },
        { id: 11, path: '../../../assets/materi/12.jpg' },
        { id: 12, path: '../../../assets/materi/13.jpg' },
    ];

    ProfileMenu: any[] = [
        {
            id: 'komunikasi',
            menu: 'Komunikasi',
            content: `
              <p><strong>Komunikasi</strong></p>
              <p>
                Berdasarkan Kamus Besar Bahasa Indonesia (KBBI), komunikasi adalah pengiriman dan penerimaan pesan atau berita antara dua orang atau lebih sehingga pesan yang dimaksud dapat dipahami. Kata komunikasi berasal dari bahasa Latin, yaitu <em>communicatus</em> yang berarti berbagi atau menjadi milik bersama. Hal tersebut mengacu pada upaya yang bertujuan untuk mencapai kebersamaan. Sehingga komunikasi dapat diartikan sebagai suatu proses penyampaian informasi atau pesan dari satu pihak ke pihak lain.
              </p>
              <p>
                Proses komunikasi merupakan proses penyampaian pikiran atau perasaan seseorang kepada orang lain. Komunikasi akan berhasil apabila pikiran yang disampaikan dengan menggunakan perasaan yang disadari.
              </p>
              <p>Langkah-langkah proses komunikasi sebagai berikut:</p>
              <ol>
                <li>Komunikator memiliki gagasan atau pesan/informasi yang ingin disampaikan kepada komunikan.</li>
                <li>Komunikator membuat/menyusun sandi-sandi (<em>encoding</em>) untuk menyatakan maksud, baik dalam bentuk kata-kata maupun lambang (gambar, warna, bahasa sandi, tulisan) sebagai pesan.</li>
                <li>Perkataan dan lambang-lambang pesan disalurkan melalui media.</li>
                <li>Komunikan menguraikan/menafsirkan pesan (<em>decoding</em>) yang dikirimkan oleh komunikator sehingga mempunyai makna.</li>
                <li>Komunikan memberikan tanggapan (<em>feedback</em>) terhadap informasi yang diberikan oleh komunikator, sehingga komunikator dapat menganalisis apakah pesan yang disampaikan sesuai atau tidak dengan apa yang dimaksudkannya. Karena dalam proses komunikasi dapat saja terjadi berbagai hambatan.</li>
              </ol>
            `
        },
        {
            id: 'telepon',
            menu: 'Telepon',
            content: `
              <p><strong>Telepon</strong></p>
              <p>
                Telepon berasal dari kata <em>tele</em> yang berarti jauh, sedangkan <em>phone</em> berarti suara berhubungan. Berdasarkan Kamus Besar Bahasa Indonesia, telepon adalah pesawat dengan listrik dan kawat, untuk bercakap-cakap antara dua orang yang berjauhan tempatnya; pesawat telepon. Jadi, telepon dapat diartikan sebagai penyampaian informasi dari satu pihak ke pihak lainnya yang berjarak jauh, baik dalam lingkungan sendiri maupun ke luar kota.
              </p>
              <p>Adapun fungsi telepon, antara lain sebagai berikut:</p>
              <ol>
                <li><strong>Menghemat waktu</strong><br/>
                  Dengan menggunakan telepon, orang tidak perlu lagi melakukan perjalanan jauh atau mengirim surat untuk berkomunikasi dengan orang lain sehingga dapat menghemat waktu dan biaya yang dikeluarkan.
                </li>
                <li><strong>Meningkatkan kualitas hidup</strong><br/>
                  Telepon dapat membantu meningkatkan kualitas hidup seseorang. Dengan menggunakan telepon seseorang dapat menghubungi layanan kesehatan, layanan keamanan, atau layanan lainnya yang membantu dalam situasi darurat.
                </li>
                <li><strong>Meningkatkan produktivitas</strong><br/>
                  Telepon dapat membantu meningkatkan produktivitas, terutama dalam perkembangan suatu perusahaan. Dengan menggunakan telepon, seseorang dapat mengatur janji temu, melakukan transaksi, serta berkomunikasi dengan klien atau rekan kerja lainnya secara cepat dan efisien.
                </li>
                <li><strong>Menjalin hubungan sosial</strong><br/>
                  Telepon memungkinkan orang untuk menjalin hubungan sosial dengan keluarga, teman, atau orang yang baru dikenal. Telepon dapat membantu orang merasa lebih terhubung dengan dunia di sekitarnya.
                </li>
                <li><strong>Memfasilitasi bisnis</strong><br/>
                  Fungsi telepon juga dapat memfasilitasi bisnis, terutama telepon seluler dan konferensi. Melalui telepon seluler, orang dapat melakukan bisnis dari berbagai tempat dan waktu. Telepon konferensi membuat orang dapat berkomunikasi dengan banyak orang sekaligus dari lokasi yang berbeda.
                </li>
                <li><strong>Memudahkan komunikasi jarak jauh</strong><br/>
                  Telepon dapat berfungsi sebagai komunikasi dengan orang terjauh yang berbeda lokasi, langsung dengan siapa saja yang jauh sekalipun. Melalui telepon, orang dapat berbicara secara langsung dengan keluarga, teman, atau rekan bisnis tanpa harus bertatap muka.
                </li>
              </ol>
            `
        },
        {
            id: 'menjawab-telepon',
            menu: 'Menjawab Telepon',
            content: `
              <p><strong>Menjawab Telepon</strong></p>
              <p>
                Kemampuan etika bertelepon atau cara bertelepon yang baik penting untuk dikuasai bagi semua pihak, baik pengguna maupun penerima telepon. Etika penerima telepon (sekretaris atau resepsionis) akan mencerminkan citra organisasi atau perusahaan. Sebagai contohnya di bawah ini terdapat beberapa sikap dasar yang perlu dilakukan saat menjawab telepon, yaitu:
              </p>
              <ol>
                <li>Menjawab telepon sebelum berdering 3 kali.</li>
                <li>Mengucap salam dan memperkenalkan diri.</li>
                <li>Memegang gagang telepon 1–2 inchi dari bibir.</li>
                <li>Menyapa penelepon dengan sebutan Ibu atau Bapak.</li>
                <li>Menanyakan keperluan dan menawarkan bantuan sesuai SOP.</li>
                <li>Mencatat pesan yang disampaikan oleh penelepon.</li>
                <li>Menjawab pertanyaan dan meneruskan pada orang yang tepat.</li>
                <li>Menawarkan kembali bantuan kepada penelepon.</li>
                <li>Mengucapkan terima kasih dan salam pada akhir pembicaraan.</li>
                <li>Menutup telepon setelah penelepon memutuskan hubungan terlebih dahulu.</li>
                <li>Meletakkan gagang telepon dengan pelan dan hati-hati.</li>
              </ol>
            `
        },
        {
            id: 'melakukan-panggilan-telepon',
            menu: 'Melakukan Panggilan Telepon',
            content: `
              <p><strong>Melakukan Panggilan Telepon</strong></p>
              
              <p><strong>a) Persiapan sebelum melakukan telepon</strong></p>
              <p>
                Sebelum melakukan panggilan telepon, penting untuk melakukan beberapa persiapan agar komunikasi berjalan lancar dan efektif. Hal-hal yang perlu disiapkan antara lain:
              </p>
              <ol>
                <li>Mempersiapkan direktori telepon yang berisi nomor-nomor penting.</li>
                <li>Menyiapkan alat tulis untuk mencatat informasi penting.</li>
                <li>Menyusun materi atau topik pembicaraan yang akan dibahas agar komunikasi terarah.</li>
              </ol>
          
              <p><strong>b) Cara menelepon yang benar</strong></p>
              <p>
                Agar komunikasi melalui telepon berjalan dengan baik, berikut adalah langkah-langkah dalam melakukan panggilan telepon yang benar:
              </p>
              <ol>
                <li>Menekan nomor telepon yang dituju dengan benar untuk menghindari kesalahan sambungan.</li>
                <li>Menyebutkan identitas diri di awal pembicaraan agar penerima telepon mengetahui siapa yang menghubungi.</li>
                <li>Menyampaikan maksud pembicaraan dengan jelas dan sopan sesuai etika bertelepon dan standar operasional prosedur (SOP).</li>
                <li>Mencatat semua informasi atau jawaban penting selama pembicaraan berlangsung.</li>
                <li>Mengakhiri pembicaraan telepon dengan cara yang sopan dan ramah.</li>
              </ol>
          
              <p><strong>Jangan diucapkan:</strong></p>
              <ul>
                <li>Halo!</li>
                <li>Apa?</li>
                <li>Ini siapa?</li>
                <li>Bapak/Ibu tidak ada</li>
                <li>Tunggu ya!</li>
                <li>Sudah?</li>
              </ul>
          
              <p><strong>Sebaiknya diucapkan:</strong></p>
              <ul>
                <li>Selamat pagi/siang/sore.</li>
                <li>Maaf, apa boleh diulangi?</li>
                <li>Boleh saya tahu dengan siapa saya berbicara?</li>
                <li>Mohon ditunggu</li>
                <li>Maaf, kebetulan Bapak/Ibu sedang rapat.</li>
                <li>Masih ada yang ingin disampaikan?</li>
              </ul>
            `
        },
        {
            id: 'menangani-pesan-telepon',
            menu: 'Menangani Pesan Telepon',
            content: `
              <p><strong>Menangani Pesan Telepon</strong></p>
          
              <p>
                Pembicaraan melalui telepon bukan komunikasi tatap muka sehingga lawan bicara tidak dapat melihat secara nonverbal. Meskipun demikian, kita tetap harus selalu menjaga etika dalam bertelepon. Adapun hal-hal yang harus diperhatikan ketika menerima telepon, sebagai berikut:
              </p>
          
              <ol type="a">
                <li>Mengangkat gagang telepon dengan menggunakan tangan kiri dan tangan kanan memegang alat tulis serta Lembar Pesan Telepon (LPT) untuk mencatat hal yang penting.</li>
                <li>Menyampaikan salam, seperti selamat pagi, selamat siang, dan selamat sore. Menyapa penelepon dengan sebutan Ibu/Bapak.</li>
                <li>Menyebutkan identitas diri, kantor atau perusahaan.</li>
                <li>Catat hal-hal penting dalam Lembar Pesan Telepon (LPT).</li>
                <li>Jika penelepon kurang jelas, jangan sampai menyebutkan kata apa, hah, heh, karena hal itu kurang sopan. Sebaiknya mohon kepada penelepon agar mengulangi lagi maksudnya atau kita sendiri mengulang kembali maksud (konfirmasi).</li>
                <li>Jika penelepon belum memberitahukan identitasnya, mintalah agar penelepon menyebutkan identitas yang jelas dan nomor telepon yang dapat dihubungi.</li>
                <li>Usahakan menerima telepon dengan bersemangat meskipun pekerjaan menumpuk, jangan sampai suara terdengar lesu.</li>
                <li>Jika penelepon terdengar tidak ramah atau bermaksud mengadu, tanganilah dengan cara profesional. Tetap tenang, kendalikan diri, berbicara dengan sabar serta bijaksana, namun tegas.</li>
                <li>Mendengarkan dengan seksama apa yang diinginkan penelepon (jadilah pendengar yang baik).</li>
                <li>Menjawab setiap pertanyaan dengan jelas, singkat, dan tepat.</li>
                <li>Menyebutkan nama penelepon dengan tepat, jangan sampai keliru. Karena salah satu ciri akrab dan perhatian ialah menyebut nama orang yang tepat.</li>
              </ol>
            `
        }

    ];

    SelectedMateri: any = this.MateriDatasource[0];
    SelectedMateriIndex: number = 0;

    Sound = new Howl({
        src: ['../../../../assets/voice/voice-background.mp3'],
        loop: false,
    });

    constructor() { }

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
        // setTimeout(() => {
        //     if (!this.StartSound) {
        //         this.StartSound = true;
        //         this.Sound.play();
        //     };
        // }, 1500);
    }

    ngOnDestroy(): void {
        this.StartSound = false;
        this.Sound.stop();
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    handleNextPrevMateri(action: 'prev' | 'next') {
        if (action == 'prev') {
            this.SelectedMateriIndex = this.SelectedMateriIndex - 1;
            this.SelectedMateri = this.MateriDatasource[this.SelectedMateriIndex];
        } else {
            this.SelectedMateriIndex = this.SelectedMateriIndex + 1;
            this.SelectedMateri = this.MateriDatasource[this.SelectedMateriIndex];
        }
    }

    handleClickMenu(args: any, index: number) {
        this.SelectedMateriIndex = index;
        this.SelectedMateri = args;
    }
}
