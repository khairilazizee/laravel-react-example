import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: '/posts',
    },
];

type post = {
    id: number;
    title: string;
    image: string;
    created_at: string;
};

type PageProps = {
    posts: post[];
};

export default function PostIndex() {
    const { posts } = usePage<PageProps>().props;

    const { delete: destroy } = useForm();

    const destroyPost = (e: any, id: number) => {
        e.preventDefault();
        if (confirm('Are you sure you want to delete this post?')) {
            destroy(route('posts.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Post" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex justify-end">
                    <a
                        href={route('posts.create')}
                        className="cursor-pointer rounded-md bg-blue-400 px-3 py-2 text-sm font-bold uppercase hover:bg-blue-600"
                    >
                        Add Post
                    </a>
                </div>
                <table className="w-full table-auto">
                    <thead className="bg-white text-black">
                        <tr>
                            <th className="text-left">Title</th>
                            <th className="text-left">Image</th>
                            <th className="text-left">Published At</th>
                            <th className="text-left">Actions</th>
                        </tr>
                    </thead>
                    {posts.map((post: post) => {
                        return (
                            <tbody>
                                <tr>
                                    <td>{post.title}</td>
                                    <td>{post.image ? 'Image here' : 'No Image'}</td>
                                    <td>{dayjs(post.created_at).format('DD/MM/YYYY')}</td>
                                    <td>
                                        <form onSubmit={(e) => destroyPost(e, post.id)}>
                                            <a href={route('posts.edit', post.id)}>Edit</a> |{' '}
                                            <button className="cursor-pointer" type="submit">
                                                Delete
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            </tbody>
                        );
                    })}
                </table>
            </div>
        </AppLayout>
    );
}
