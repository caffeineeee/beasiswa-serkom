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
import Uploader from "@/components/uploader";

export function TabsInClient({ children }: { children: ReactNode; }) {
    const storedDefaultTabValue = localStorage.getItem('selectedTab') || 'pilihanBeasiswa';
    const [selectedTab, setSelectedTab] = useState(storedDefaultTabValue as "pilihanBeasiswa" | "daftar" | "hasil");

    // Update localStorage when the selectedTab changes
    useEffect(() => {
        localStorage.setItem('selectedTab', selectedTab);
    }, [selectedTab]);

    return (
        <Tabs defaultValue={selectedTab} className="w-[32rem]">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="pilihanBeasiswa" id="pilihanBeasiswa" onClick={() => setSelectedTab("pilihanBeasiswa")}>
                    Pilihan Beasiswa
                </TabsTrigger>
                <TabsTrigger value="daftar" id="daftar" onClick={() => setSelectedTab("daftar")}>
                    Daftar
                </TabsTrigger>
                <TabsTrigger value="hasil" id="hasil" onClick={() => setSelectedTab("hasil")}>
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
                            <ol className="pl-8">
                                <li key="1">1. Merupakan mahasiswa S1 dari Semester 1 hingga 8.</li>
                                <li key="2">2. Memiliki nilai IPK terakhir &gt;= 3.00.</li>
                                <li key="3">3. Mengajukan berkas persyaratan yaitu Transkrip Nilai terakhir saat pendaftaran.</li>
                            </ol>
                            <p>Apabila Anda memenuhi persyaratan di atas, daftarkan segera!</p>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold pb-2">2. Beasiswa Non-akademik</h1>
                            Untuk mendaftar ke jenis beasiswa Non-akademik, Anda perlu memenuhi beberapa persyaratan berikut:
                            <ol className="pl-8">
                                <li>1. Merupakan mahasiswa S1 dari Semester 1 hingga 8.</li>
                                <li>2. Memiliki nilai IPK terakhir &gt;= 3.00.</li>
                                <li>3. Mengajukan berkas persyaratan yaitu Transkrip Nilai terakhir dan sertifikat perlombaan saat pendaftaran.</li>
                            </ol>
                            <p>Apabila Anda memenuhi persyaratan di atas, daftarkan segera!</p>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="daftar">
                <DaftarForm>
                    <div className="bg-white/30 p-2 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
                        <Uploader />
                    </div>
                </DaftarForm>
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
