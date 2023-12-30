"use server";

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

export type StatusAjuan = "Belum Diverifikasi" | "Sudah Diverifikasi";

export async function saveDaftarBeasiswa(formData: FormData) {

  {/* created_at, nama, email, no_hp, smt_saat_ini, ipk_terakhir, pilihan_beasiswa, status_ajuan */ }
  const nama = formData.get("nama")?.toString() || "";
  const email = formData.get('email')?.toString() || "";
  const noHp = formData.get('no-hp')?.toString() || "";
  const smtSaatIni = formData.get('smt-saat-ini')?.toString() || "1";
  let ipkTerakhir = parseFloat(formData.get('ipk-terakhir')?.toString() || "");
  if (isNaN(ipkTerakhir)) {
    ipkTerakhir = 3.01;
    return ipkTerakhir;
  }
  const pilihanBeasiswa = formData.get('pilihan-beasiswa')?.toString() || "";
  const statusAjuan: StatusAjuan = "Belum Diverifikasi";
  const fileUploadUrl = formData.get('file-upload-url')?.toString() || "";

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