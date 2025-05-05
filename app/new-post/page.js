import PostForm from '@/components/post-form';
import { storePost } from '@/lib/posts';
import { redirect } from 'next/navigation';


export async function createPost(prevState , formData) {
  "use server";
  const title = formData.get('title');
  const image = formData.get('image');
  const content = formData.get('content');
  //console.log(title,image,content);

  let errors = [];

  if (!title || title.trim().length === 0) {
    errors.push("Title is required");
  }
  if (!content || content.trim().length === 0) {
    errors.push("Content is required");
  }
  if (!image) {
    errors.push("Image is required");
  }

  if (errors.length > 0) {
    return { errors };
  }


  await storePost({
    imageUrl: '',
    title,
    content,
    userId: 1
  });
  redirect('/feed');
}
export default function NewPostPage() {




  return (
    <>
      <PostForm action={createPost} />
    </>
  );
}

