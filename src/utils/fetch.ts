import { serverUrl } from '@/env/server';

export async function fetchApi(apiUrl: string) {
    return fetch(`${serverUrl}/api${apiUrl}`);
}
