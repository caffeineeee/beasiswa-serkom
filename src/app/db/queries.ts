"use server";

import { sql } from '@vercel/postgres';
import {
    unstable_noStore as noStore,
} from 'next/cache';

export async function getAllDaftarBeasiswa() {
    if (!process.env.POSTGRES_URL) {
        return [];
    }

    // noStore();
    const data = await sql`
        SELECT *
        FROM beasiswa
        `;

    return data.rows;
}

export async function getLatestDaftarBeasiswa() {
    if (!process.env.POSTGRES_URL) {
        return [];
    }

    // noStore();
    const data = await sql`
        SELECT *
        FROM beasiswa
        ORDER BY created_at DESC
        LIMIT 1;
        `;

    return data.rows;
}