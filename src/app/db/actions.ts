"use server";

import { uploadedFileUrl } from '@/components/uploader';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

export type StatusAjuan = "Belum Diverifikasi" | "Sudah Diverifikasi";

export async function saveDaftarBeasiswa(formData: FormData) {

  {/* created_at, nama, email, no_hp, smt_saat_ini, ipk_terakhir, pilihan_beasiswa, status_ajuan */ }
  const nama = formData.get("nama") as string;
  const email = formData.get('email') as string;
  const noHp = formData.get('no-hp') as string;
  const smtSaatIni = formData.get('smt-saat-ini') as string;
  const ipkTerakhirString = formData.get('ipk-terakhir') as string;
  const ipkTerakhir = parseFloat(ipkTerakhirString);
  const pilihanBeasiswa = formData.get('pilihan-beasiswa') as string;
  const statusAjuan: StatusAjuan = "Belum Diverifikasi";
  const fileUploadUrl = uploadedFileUrl.value;

  await sql`
    INSERT INTO beasiswa (nama, email, no_hp, smt_saat_ini, ipk_terakhir, pilihan_beasiswa, status_ajuan, created_at, file_upload_url)
    VALUES (${ nama }, ${ email }, ${ noHp }, ${ smtSaatIni }, ${ ipkTerakhir }, ${ pilihanBeasiswa }, ${ statusAjuan }, NOW(), ${ fileUploadUrl });
  `;

  revalidatePath('/');

  console.log("nama: ", nama);
  console.log("email: ", email);
  console.log("noHp: ", noHp);
  console.log("smtSaatIni: ", smtSaatIni);
  console.log("ipkTerakhir: ", ipkTerakhir);
  console.log("pilihanBeasiswa: ", pilihanBeasiswa);
  console.log("statusAjuan: ", statusAjuan);
  console.log("fileUploadUrl: ", fileUploadUrl);
}