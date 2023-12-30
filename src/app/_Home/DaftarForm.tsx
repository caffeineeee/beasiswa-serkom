"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { saveDaftarBeasiswa } from "../db/actions";
import { signal } from "@preact/signals-react";
import Image from 'next/image';
import { useState, useCallback, useMemo, ChangeEvent } from 'react';
import toast from 'react-hot-toast';
import { PutBlobResult } from '@vercel/blob';
import { cn } from "@/lib/utils";
import { LoadingDots } from "@/components/loading-dots";

// Function to generate a random value between 2 and 4
export function generateRandomIpkTerakhir() {
    const randomIpk = (Math.random() * 1.5) + 2.5;
    return parseFloat(randomIpk.toFixed(2)); // Round to two decimal places
}
export const ipkTerakhir = signal(generateRandomIpkTerakhir()).value;

export function DaftarForm() {

    const formRef = useRef<HTMLFormElement>(null);
    const { pending } = useFormStatus();
    const [data, setData] = useState<{
        image: string | null;
    }>({
        image: null,
    });
    const [fileUploadUrl, setFileUploadUrl] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const [dragActive, setDragActive] = useState(false);

    useEffect(() => {
        // Update form data when fileUploadUrl changes
        if (formRef.current) {
            const formData = new FormData(formRef.current);
            formData.append('file-upload-url', fileUploadUrl?.toString() || "");
            console.log("--Current value of `fileUploadUrl`: ", fileUploadUrl);
        }
    }, [fileUploadUrl]);

    const onChangePicture = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const file = event.currentTarget.files && event.currentTarget.files[0];
            if (file) {
                if (file.size / 1024 / 1024 > 50) {
                    toast.error('File size too big (max 50MB)');
                } else {
                    setFile(file);
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        setData((prev) => ({ ...prev, image: e.target?.result as string }));
                    };
                    reader.readAsDataURL(file);
                }
            }
        },
        [setData]
    );

    const [saving, setSaving] = useState(false);

    const saveDisabled = useMemo(() => {
        return !data.image || saving;
    }, [data.image, saving]);

    return (
        <>
            <form
                ref={formRef}
                onSubmit={async (e) => {
                    e.preventDefault();
                    setSaving(true);

                    try {
                        const formData = new FormData(e.currentTarget);
                        formData.append('file-upload-url', fileUploadUrl?.toString() || "");

                        const formElements = e.currentTarget.elements;
                        for (let i = 0; i < formElements.length; i++) {
                            const element = formElements[i] as HTMLInputElement;
                            if (element.name) {
                                formData.append(element.name, element.value);
                            }
                        }

                        // Save form data
                        await saveDaftarBeasiswa(formData);

                        // Upload file
                        const uploadResponse = await fetch('/api/upload', {
                            method: 'POST',
                            headers: { 'content-type': file?.type || 'application/octet-stream' },
                            body: file,
                        });

                        if (uploadResponse.status === 200) {
                            const { url } = (await uploadResponse.json()) as PutBlobResult;
                            setFileUploadUrl(url);

                            toast(
                                (t) => (
                                    <div className="relative" key={t.id}>
                                        <div className="p-2">
                                            <p className="font-semibold text-gray-900">
                                                Berkas telah diupload!
                                            </p>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Berkas pendaftaran Anda telah diupload ke{' '}
                                                <a
                                                    className="font-medium text-gray-900 underline"
                                                    href={url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {url}
                                                </a>
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => toast.dismiss(t.id)}
                                            className="absolute top-0 -right-2 inline-flex text-gray-400 focus:outline-none focus:text-gray-500 rounded-full p-1.5 hover:bg-gray-100 transition ease-in-out duration-150"
                                        >
                                            <svg
                                                className="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 5.293a1 1 0 011.414 0L10
                      8.586l3.293-3.293a1 1 0 111.414 1.414L11.414
                      10l3.293 3.293a1 1 0 01-1.414 1.414L10
                      11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586
                      10 5.293 6.707a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                ),
                                { duration: 300000 }
                            );
                        } else {
                            const error = await uploadResponse.text();
                            toast.error(error);
                        }
                    } catch (error) {
                        console.error('An error occurred:', error);
                        toast.error('An unexpected error occurred.');
                    } finally {
                        console.log('Submitting form with fileUploadUrl:', fileUploadUrl);
                        setSaving(false);
                    }
                }}
            >
                <Card>
                    <CardHeader>
                        <CardTitle className="text-center">Daftar</CardTitle>
                        <CardDescription className="text-center">
                            Daftar ke jenis beasiswa sesuai minat Anda.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="nama">Nama</Label>
                            <Input name="nama" id="nama" placeholder="John Doe" required />
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
                            <div className="bg-white/30 p-2 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
                                <div>
                                    <div className="space-y-1 mb-4">
                                        <h2 className="text-lg font-semibold">Upload berkas persyaratan</h2>
                                        <p className="text-sm text-gray-500">
                                            Format yang diterima: .png, .jpg, .pdf, .zip
                                        </p>
                                    </div>
                                    <label
                                        htmlFor="berkas-persyaratan"
                                        className="group relative mt-2 flex h-72 cursor-pointer flex-col items-center justify-center rounded-md border border-gray-300 bg-white shadow-sm transition-all hover:bg-gray-50"
                                    >
                                        <div
                                            className="absolute z-[5] h-full w-full rounded-md"
                                            onDragOver={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setDragActive(true);
                                            }}
                                            onDragEnter={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setDragActive(true);
                                            }}
                                            onDragLeave={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setDragActive(false);
                                            }}
                                            onDrop={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setDragActive(false);

                                                const file = e.dataTransfer.files && e.dataTransfer.files[0];
                                                if (file) {
                                                    if (file.size / 1024 / 1024 > 50) {
                                                        toast.error('File size too big (max 50MB)');
                                                    } else {
                                                        setFile(file);
                                                        const reader = new FileReader();
                                                        reader.onload = (e) => {
                                                            setData((prev) => ({
                                                                ...prev,
                                                                image: e.target?.result as string,
                                                            }));
                                                        };
                                                        reader.readAsDataURL(file);
                                                    }
                                                }
                                            }}
                                        />
                                        <div
                                            className={`${ dragActive ? 'border-2 border-black' : ''
                                                } absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-md px-10 transition-all ${ data.image
                                                    ? 'bg-white/80 opacity-0 hover:opacity-100 hover:backdrop-blur-md'
                                                    : 'bg-white opacity-100 hover:bg-gray-50'
                                                }`}
                                        >
                                            <svg
                                                className={`${ dragActive ? 'scale-110' : 'scale-100'
                                                    } h-7 w-7 text-gray-500 transition-all duration-75 group-hover:scale-110 group-active:scale-95`}
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
                                                <path d="M12 12v9"></path>
                                                <path d="m16 16-4-4-4 4"></path>
                                            </svg>
                                            <p className="mt-2 text-center text-sm text-gray-500">
                                                Drag and drop atau klik untuk upload.
                                            </p>
                                            <p className="mt-2 text-center text-sm text-gray-500">
                                                Max file size: 3MB
                                            </p>
                                            <span className="sr-only">File upload</span>
                                        </div>
                                        {data.image && (
                                            <Image
                                                src={data.image}
                                                alt="Preview"
                                                className="h-full w-full rounded-md object-cover"
                                                width={320}
                                                height={320}
                                            />
                                        )}
                                    </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                        <input
                                            id="berkas-persyaratan"
                                            name="berkas-persyaratan"
                                            type="file"
                                            accept="image/*, .pdf, .zip"
                                            className="sr-only"
                                            onChange={onChangePicture}
                                        />
                                    </div>
                                </div>
                                {ipkTerakhir < 3 && <span className="text-sm text-red-500 italic font-medium text-center pb-8">Anda tidak memenuhi persyaratan (IPK terakhir &gt; 3.00).</span>}
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            disabled={pending || ipkTerakhir < 3 || !file || !data.image}
                            type="submit"
                            className={
                                cn(
                                    saveDisabled || ipkTerakhir < 3 ?
                                        'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400' :
                                        'border-black bg-black text-white hover:bg-white hover:text-black',
                                    "flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none")}
                        >
                            {saving ? (
                                <LoadingDots />
                            ) : (
                                <p className="text-sm">Daftar</p>
                            )}
                        </Button>
                        {ipkTerakhir < 3 && <div className="text-sm text-red-500 italic font-medium">Anda tidak memenuhi persyaratan (IPK terakhir &gt; 3.00).</div>}
                    </CardFooter>
                </Card>
            </form>
        </>
    );
}