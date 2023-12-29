"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ReactNode, useRef } from "react";
import { useFormStatus } from "react-dom";
import { saveDaftarBeasiswa } from "../db/actions";
import { signal } from "@preact/signals-react";

// Function to generate a random value between 2 and 4
export function generateRandomIpkTerakhir() {
    const randomIpk = (Math.random() * 2) + 2;
    return parseFloat(randomIpk.toFixed(2)); // Round to two decimal places
}

export const ipkTerakhir = signal(generateRandomIpkTerakhir()).value;

export function DaftarForm({ children }: { children: ReactNode; }) {
    const formRef = useRef<HTMLFormElement>(null);
    const { pending } = useFormStatus();

    return (
        <>
            <form
                ref={formRef}
                action={async (formData) => {
                    await saveDaftarBeasiswa(formData);
                    formRef.current?.reset();
                }}
            >
                <Card>
                    <CardHeader>
                        <CardTitle className="text-center">Daftar</CardTitle>
                        <CardDescription className="text-center">
                            Daftar ke jenis beasiswa sesuai minat Anda.
                        </CardDescription>
                    </CardHeader>
                    {/* created_at, nama, email, no_hp, smt_saat_ini, ipk_terakhir, pilihan_beasiswa, status_ajuan */}
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="nama">Nama</Label>
                            <Input name="nama" id="nama" placeholder="John Doe" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input name="email" id="email" placeholder="john.doe@example.com" type="email" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="no-hp">No. Handphone</Label>
                            <Input name="no-hp" id="no-hp" placeholder="081234567890" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="smt-saat-ini">Semester saat ini (1-8)</Label>
                            <Input name="smt-saat-ini" id="smt-saat-ini" placeholder="1" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="ipk-terakhir">IPK terakhir (&gt;= 3.00) <span className="italic text-neutral-600 ml-20 bg-red-300/30 px-8 py-1 rounded-md">diisi otomatis oleh sistem</span></Label>
                            <Input name="ipk-terakhir" id="ipk-terakhir" placeholder="3.99" type="number" min="0" max="4" step="0.01" disabled value={ipkTerakhir} />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="pilihan-beasiswa">Pilihan Beasiswa</Label>
                            <RadioGroup name="pilihan-beasiswa" defaultValue="Beasiswa Akademik">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Beasiswa Akademik" id="beasiswa-akademik" />
                                    <Label htmlFor="beasiswa-akademik">Beasiswa Akademik</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Beasiswa Non-akademik" id="beasiswa-non-akademik" />
                                    <Label htmlFor="beasiswa-non-akademik">Beasiswa Non-akademik</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className="space-y-1 pt-6">
                            <Label>Berkas persyaratan (Transkrip Nilai terakhir dan/atau sertifikat perlombaan)</Label>
                            {children}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            disabled={pending || ipkTerakhir < 3}
                            type="submit"
                        >
                            Daftar
                        </Button>
                        {ipkTerakhir < 3 && <span className="text-sm text-red-500 italic font-medium pl-8">Anda tidak memenuhi persyaratan (IPK terakhir &gt; 3.00).</span>}
                    </CardFooter>
                </Card>
            </form>
        </>
    );
}