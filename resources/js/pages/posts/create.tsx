import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Input } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: '/posts',
    },
    {
        title: 'Create Post',
        href: '/posts/create',
    },
];

export default function PostIndex() {
    const { data, setData, post, errors } = useForm({
        title: '',
        post: '',
    });

    const submit = (e: any) => {
        e.preventDefault();
        post(route('posts.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Post" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <form onSubmit={submit}>
                    <div className="grid gap-2">
                        <label htmlFor="">Full Name</label>
                        <Input
                            id="title"
                            className="mt-1 block w-full border-1 border-gray-300 p-1"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            autoComplete="title"
                            placeholder="Title"
                        />

                        <InputError className="mt-2" message={errors.title} />
                    </div>

                    <div className="grid gap-2 pt-10">
                        <label htmlFor="">Post</label>
                        <textarea
                            id="post"
                            className="mt-1 block w-full border-1 border-gray-300 p-1"
                            value={data.post}
                            onChange={(e) => setData('post', e.target.value)}
                            autoComplete="post"
                            placeholder="post"
                        />

                        <InputError className="mt-2" message={errors.post} />
                    </div>
                    <div className="pt-5">
                        <button
                            type="submit"
                            className="cursor-pointer rounded-md bg-blue-400 px-3 py-2 text-sm font-bold uppercase hover:bg-blue-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
