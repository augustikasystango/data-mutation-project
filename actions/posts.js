'use server';
import { uploadImage } from "@/lib/cloudinary";
import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
export async function createPost(prevState , formData) {
  
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
let imgUrl;
try { imgUrl= await uploadImage(image)
}
catch(error)
{
    throw new Error('Image upload failed');
}


  await storePost({
    imageUrl: imgUrl,
    title,
    content,
    userId: 1
  });
  redirect('/feed');
}

export async function togglePostLikeStatus(postId){
   await updatePostLikeStatus(postId,2);
   revalidatePath('/','layout');
}