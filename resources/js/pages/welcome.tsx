import Layout from '@/layouts/Layout';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <Layout>
            <div>Home</div>
        </Layout>
    );
}
