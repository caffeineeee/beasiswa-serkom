"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

import { DaftarForm } from './DaftarForm';
import { ReactNode, useEffect, useState } from "react";
import { signal } from "@preact/signals-react";

export function TabsInClient({ children }: { children: ReactNode; }) {
    // const storedDefaultTabValue = localStorage.getItem('selectedTab') || 'pilihanBeasiswa';
    // const [selectedTab, setSelectedTab] = useState(storedDefaultTabValue as "pilihanBeasiswa" | "daftar" | "hasil");

    // Update localStorage when the selectedTab changes
    // useEffect(() => {
    //     localStorage.setItem('selectedTab', selectedTab);
    // }, [selectedTab]);

    return (
        <Tabs defaultValue='daftar' className="w-[32rem]">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="pilihanBeasiswa" id="pilihanBeasiswa">
                    Pilihan Beasiswa
                </TabsTrigger>
                <TabsTrigger value="daftar" id="daftar">
                    Daftar
                </TabsTrigger>
                <TabsTrigger value="hasil" id="hasil">
                    Hasil
                </TabsTrigger>
            </TabsList>
            <TabsContent value="pilihanBeasiswa">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-center">Pilihan Beasiswa</CardTitle>
                        <CardDescription className="text-center">
                            Pilih jenis beasiswa sesuai minat Anda.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div>
                            <h1 className="text-xl font-bold pb-2">1. Beasiswa Akademik</h1>
                            Untuk mendaftar ke jenis beasiswa Akademik, Anda perlu memenuhi beberapa persyaratan berikut:
                            1. Merupakan mahasiswa S1 dari Semester 1 hingga 8.
                            2. Memiliki nilai IPK terakhir &gt;= 3.00.
                            3. Mengajukan berkas persyaratan yaitu Transkrip Nilai terakhir saat pendaftaran.
                            <p>Apabila Anda memenuhi persyaratan di atas, daftarkan segera!</p>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold pb-2">2. Beasiswa Non-akademik</h1>
                            Untuk mendaftar ke jenis beasiswa Non-akademik, Anda perlu memenuhi beberapa persyaratan berikut:
                            1. Merupakan mahasiswa S1 dari Semester 1 hingga 8.
                            2. Memiliki nilai IPK terakhir &gt;= 3.00.
                            3. Mengajukan berkas persyaratan yaitu Transkrip Nilai terakhir dan sertifikat perlombaan saat pendaftaran.
                            <p>Apabila Anda memenuhi persyaratan di atas, daftarkan segera!</p>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="daftar">
                <DaftarForm />
            </TabsContent>
            <TabsContent value="hasil">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-center">Hasil Daftar Beasiswa</CardTitle>
                        <CardDescription className="text-center">
                            Berikut ini hasil pendaftaran beasiswa Anda.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {children}
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
}
