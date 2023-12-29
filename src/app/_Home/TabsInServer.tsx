import { cn } from "@/lib/utils";
import { type StatusAjuan } from "../db/actions";
import { getLatestDaftarBeasiswa } from "../db/queries";
import Image from 'next/image';

export type Data = {
    id: number;
    nama: string;
    email: string;
    no_hp: string;
    smt_saat_ini: string;
    ipk_terakhir: number;
    pilihan_beasiswa: string;
    status_ajuan: StatusAjuan;
    created_at: Date;
    file_upload_url: string;
}[];

export async function TabsInServer() {
    const beasiswa = await getLatestDaftarBeasiswa() as Data;

    return (
        <>
            {beasiswa?.map((data) => (
                <>
                    <div
                        key={data.id}
                        className="space-y-1 pb-8"
                    >
                        {/* created_at, nama, email, no_hp, smt_saat_ini, ipk_terakhir, pilihan_beasiswa, status_ajuan */}
                        <p className="text-neutral-600 text-right">Dibuat pada: {data.created_at.toLocaleString()}</p>
                        <p className="">Status Ajuan: <span className={cn(data.status_ajuan === "Sudah Diverifikasi" ? "bg-green-600" : "bg-red-500", "text-neutral-100 p-1 px-2 rounded-lg")}>{data.status_ajuan}</span></p>
                        <p>Nama: {data.nama}</p>
                        <p>Email: {data.email}</p>
                        <p>No. Handphone: {data.no_hp}</p>
                        <p>Semester saat ini: {data.smt_saat_ini}</p>
                        <p>IPK Terakhir: {data.ipk_terakhir}</p>
                        <p>Pilihan Beasiswa: {data.pilihan_beasiswa}</p>
                        <p>Berkas Pendaftaran yang Diupload:</p>
                        <a
                            className="text-sm text-blue-700 underline"
                            href={data.file_upload_url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {data.file_upload_url}
                        </a>
                        {data.file_upload_url && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <Image
                                src={data.file_upload_url}
                                alt="Preview"
                                className="h-full w-full rounded-md object-cover"
                                width={640}
                                height={640}
                            />
                        )}
                    </div>
                </>
            ))}
        </>
    );
}