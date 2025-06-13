// import { NextResponse } from 'next/server';
// import fs from 'fs';
// import path from 'path';

// // Path to posts.json in the project root
// const postsFilePath = path.join(process.cwd(), 'posts.json');

// // Ensure posts.json exists
// if (!fs.existsSync(postsFilePath)) {
//   fs.writeFileSync(postsFilePath, JSON.stringify([]));
// }

// // Helper functions to read/write posts
// const readPosts = () => JSON.parse(fs.readFileSync(postsFilePath, 'utf-8'));
// const writePosts = (posts: any) => fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));

// // GET: Fetch all posts
// export async function GET() {
//   try {
//     const posts = readPosts();
//     return NextResponse.json(posts, { status: 200 });
//   } catch (error) {
//     console.error('Error fetching posts:', error);
//     return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
//   }
// }

// // POST: Create a new post
// export async function POST(request: Request) {
//   try {
//     const newPost = await request.json();
//     const posts = readPosts();
//     posts.push(newPost);
//     writePosts(posts);
//     return NextResponse.json(newPost, { status: 201 });
//   } catch (error) {
//     console.error('Error creating post:', error);
//     return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
//   }
// }

// // PUT: Update a post (e.g., for replies or pinning)
// export async function PUT(request: Request) {
//   try {
//     const updatedPost = await request.json();
//     let posts = readPosts();
//     posts = posts.map((post: any) =>
//       post.id === updatedPost.id ? updatedPost : post
//     );
//     writePosts(posts);
//     return NextResponse.json({ message: 'Post updated' }, { status: 200 });
//   } catch (error) {
//     console.error('Error updating post:', error);
//     return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
//   }
// }

// // DELETE: Delete a post by ID
// export async function DELETE(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get('id');
//     if (!id) {
//       return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
//     }
//     let posts = readPosts();
//     posts = posts.filter((post: any) => post.id !== id);
//     writePosts(posts);
//     return NextResponse.json({ message: 'Post deleted' }, { status: 200 });
//   } catch (error) {
//     console.error('Error deleting post:', error);
//     return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
//   }
// }





// import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';
// import { getCurrentUser } from '@/lib/auth'; // Assuming you have an auth helper to get the current user

// // GET: Fetch all posts with author and replies
// export async function GET() {
//   try {
//     const posts = await prisma.post.findMany({
//       include: {
//         author: {
//           include: {
//             profile: true, // Include profile to get role and avatar
//           },
//         },
//         replies: {
//           include: {
//             author: {
//               include: {
//                 profile: true,
//               },
//             },
//           },
//         },
//       },
//       orderBy: { createdAt: 'desc' }, // Default to latest posts
//     });

//     // Serialize posts to match frontend expectations
//     const serializedPosts = posts.map(post => ({
//       id: post.id,
//       title: post.title,
//       content: post.content,
//       author: {
//         name: post.author.name,
//         role: post.author.profile?.role || 'STUDENT',
//         avatar: post.author.profile?.imageUrl || post.author.name.charAt(0),
//       },
//       createdAt: post.createdAt.getTime(), // Convert to timestamp
//       date: post.date,
//       timeSince: post.timeSince,
//       isPinned: post.isPinned,
//       replies: post.replies.map(reply => ({
//         id: reply.id,
//         content: reply.content,
//         author: {
//           name: reply.author.name,
//           role: reply.author.profile?.role || 'STUDENT',
//           avatar: reply.author.profile?.imageUrl || reply.author.name.charAt(0),
//         },
//         createdAt: reply.createdAt.getTime(),
//         date: reply.date,
//       })),
//     }));

//     return NextResponse.json(serializedPosts, { status: 200 });
//   } catch (error) {
//     console.error('Error fetching posts:', error);
//     return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
//   }
// }

// // POST: Create a new post
// export async function POST(request: Request) {
//   try {
//     const currentUser = await getCurrentUser();
//     if (!currentUser) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     const { title, content, createdAt, date, timeSince } = await request.json();

//     if (!title || !content) {
//       return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
//     }

//     const post = await prisma.post.create({
//       data: {
//         title,
//         content,
//         authorId: currentUser.id,
//         createdAt: new Date(createdAt),
//         date,
//         timeSince,
//         isPinned: false,
//       },
//       include: {
//         author: {
//           include: {
//             profile: true,
//           },
//         },
//       },
//     });

//     const serializedPost = {
//       id: post.id,
//       title: post.title,
//       content: post.content,
//       author: {
//         name: post.author.name,
//         role: post.author.profile?.role || 'STUDENT',
//         avatar: post.author.profile?.imageUrl || post.author.name.charAt(0),
//       },
//       createdAt: post.createdAt.getTime(),
//       date: post.date,
//       timeSince: post.timeSince,
//       isPinned: post.isPinned,
//       replies: [],
//     };

//     return NextResponse.json(serializedPost, { status: 201 });
//   } catch (error) {
//     console.error('Error creating post:', error);
//     return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
//   }
// }

// // PUT: Update a post (e.g., for replies or pinning)
// export async function PUT(request: Request) {
//   try {
//     const currentUser = await getCurrentUser();
//     if (!currentUser) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     const updatedPost = await request.json();
//     const { id, replies, isPinned } = updatedPost;

//     if (!id) {
//       return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
//     }

//     // Handle replies if provided
//     if (replies && Array.isArray(replies)) {
//       for (const reply of replies) {
//         await prisma.reply.create({
//           data: {
//             id: reply.id,
//             content: reply.content,
//             authorId: currentUser.id,
//             postId: id,
//             createdAt: new Date(reply.createdAt),
//             date: reply.date,
//           },
//         });
//       }
//     }

//     // Update post (e.g., for pinning)
//     const post = await prisma.post.update({
//       where: { id },
//       data: {
//         isPinned: isPinned !== undefined ? isPinned : undefined,
//       },
//       include: {
//         author: {
//           include: {
//             profile: true,
//           },
//         },
//         replies: {
//           include: {
//             author: {
//               include: {
//                 profile: true,
//               },
//             },
//           },
//         },
//       },
//     });

//     const serializedPost = {
//       id: post.id,
//       title: post.title,
//       content: post.content,
//       author: {
//         name: post.author.name,
//         role: post.author.profile?.role || 'STUDENT',
//         avatar: post.author.profile?.imageUrl || post.author.name.charAt(0),
//       },
//       createdAt: post.createdAt.getTime(),
//       date: post.date,
//       timeSince: post.timeSince,
//       isPinned: post.isPinned,
//       replies: post.replies.map(reply => ({
//         id: reply.id,
//         content: reply.content,
//         author: {
//           name: reply.author.name,
//           role: reply.author.profile?.role || 'STUDENT',
//           avatar: reply.author.profile?.imageUrl || reply.author.name.charAt(0),
//         },
//         createdAt: reply.createdAt.getTime(),
//         date: reply.date,
//       })),
//     };

//     return NextResponse.json(serializedPost, { status: 200 });
//   } catch (error) {
//     console.error('Error updating post:', error);
//     return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
//   }
// }

// // DELETE: Delete a post by ID
// export async function DELETE(request: Request) {
//   try {
//     const currentUser = await getCurrentUser();
//     if (!currentUser) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get('id');

//     if (!id) {
//       return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
//     }

//     // Optional: Check if the user is the author or has permission to delete
//     const post = await prisma.post.findUnique({
//       where: { id },
//       select: { authorId: true },
//     });

//     if (!post) {
//       return NextResponse.json({ error: 'Post not found' }, { status: 404 });
//     }

//     if (post.authorId !== currentUser.id) {
//       return NextResponse.json({ error: 'Forbidden: You can only delete your own posts' }, { status: 403 });
//     }

//     await prisma.post.delete({
//       where: { id },
//     });

//     return NextResponse.json({ message: 'Post deleted' }, { status: 200 });
//   } catch (error) {
//     console.error('Error deleting post:', error);
//     return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
//   }
// }







import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

// GET: Fetch all posts with author and replies
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          include: {
            profile: true,
          },
        },
        replies: {
          include: {
            author: {
              include: {
                profile: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    console.log('Fetched Posts:', posts.map(p => ({ id: p.id, title: p.title }))); // Debug: Log fetched posts

    const serializedPosts = posts.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      author: {
        name: post.author.name,
        role: post.author.profile?.role || 'STUDENT',
        avatar: post.author.profile?.imageUrl || post.author.name.charAt(0),
      },
      createdAt: post.createdAt.getTime(),
      date: post.date,
      timeSince: post.timeSince,
      isPinned: post.isPinned,
      replies: post.replies.map(reply => ({
        id: reply.id,
        content: reply.content,
        author: {
          name: reply.author.name,
          role: reply.author.profile?.role || 'STUDENT',
          avatar: reply.author.profile?.imageUrl || reply.author.name.charAt(0),
        },
        createdAt: reply.createdAt.getTime(),
        date: reply.date,
      })),
    }));

    return NextResponse.json(serializedPosts, { status: 200 });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

// POST: Create a new post
export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    console.log('Current User (POST):', currentUser); // Debug: Log current user
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, title, content, createdAt, date, timeSince } = await request.json();
    console.log('New Post Data:', { id, title, createdAt }); // Debug: Log post data

    if (!title || !content || !id) {
      return NextResponse.json({ error: 'ID, title, and content are required' }, { status: 400 });
    }

    const post = await prisma.post.create({
      data: {
        id, // Use the provided ID (timestamp-based string)
        title,
        content,
        authorId: currentUser.id,
        createdAt: new Date(createdAt),
        date,
        timeSince,
        isPinned: false,
      },
      include: {
        author: {
          include: {
            profile: true,
          },
        },
      },
    });

    console.log('Created Post:', { id: post.id, title: post.title }); // Debug: Log created post

    const serializedPost = {
      id: post.id,
      title: post.title,
      content: post.content,
      author: {
        name: post.author.name,
        role: post.author.profile?.role || 'STUDENT',
        avatar: post.author.profile?.imageUrl || post.author.name.charAt(0),
      },
      createdAt: post.createdAt.getTime(),
      date: post.date,
      timeSince: post.timeSince,
      isPinned: post.isPinned,
      replies: [],
    };

    return NextResponse.json(serializedPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// PUT: Update a post (e.g., for replies or pinning)
export async function PUT(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const updatedPost = await request.json();
    const { id, replies, isPinned } = updatedPost;

    if (!id) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }

    // Handle replies if provided
    if (replies && Array.isArray(replies)) {
      for (const reply of replies) {
        await prisma.reply.create({
          data: {
            id: reply.id,
            content: reply.content,
            authorId: currentUser.id,
            postId: id,
            createdAt: new Date(reply.createdAt),
            date: reply.date,
          },
        });
      }
    }

    // Update post (e.g., for pinning)
    const post = await prisma.post.update({
      where: { id },
      data: {
        isPinned: isPinned !== undefined ? isPinned : undefined,
      },
      include: {
        author: {
          include: {
            profile: true,
          },
        },
        replies: {
          include: {
            author: {
              include: {
                profile: true,
              },
            },
          },
        },
      },
    });

    const serializedPost = {
      id: post.id,
      title: post.title,
      content: post.content,
      author: {
        name: post.author.name,
        role: post.author.profile?.role || 'STUDENT',
        avatar: post.author.profile?.imageUrl || post.author.name.charAt(0),
      },
      createdAt: post.createdAt.getTime(),
      date: post.date,
      timeSince: post.timeSince,
      isPinned: post.isPinned,
      replies: post.replies.map(reply => ({
        id: reply.id,
        content: reply.content,
        author: {
          name: reply.author.name,
          role: reply.author.profile?.role || 'STUDENT',
          avatar: reply.author.profile?.imageUrl || reply.author.name.charAt(0),
        },
        createdAt: reply.createdAt.getTime(),
        date: reply.date,
      })),
    };

    return NextResponse.json(serializedPost, { status: 200 });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

// DELETE: Delete a post by ID
export async function DELETE(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    console.log('Current User:', currentUser);
    if (!currentUser) {
      console.error('No authenticated user found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    console.log('Post ID to delete:', id);

    if (!id) {
      console.error('Post ID is missing');
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }

    // Fetch the post to check existence and authorship
    const post = await prisma.post.findUnique({
      where: { id },
      select: { id: true, authorId: true },
    });

    console.log('Fetched Post:', post);
    if (!post) {
      console.error(`Post with ID ${id} not found`);
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Check if the current user is the author
    if (post.authorId !== currentUser.id) {
      console.error(`User ${currentUser.id} is not authorized to delete post ${id} (author: ${post.authorId})`);
      return NextResponse.json(
        { error: 'Forbidden: You can only delete your own posts' },
        { status: 403 }
      );
    }

    // Delete the post (Prisma will cascade delete associated replies)
    await prisma.post.delete({
      where: { id },
    });

    console.log(`Post ${id} deleted successfully by user ${currentUser.id}`);
    return NextResponse.json({ message: 'Post deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: 'Failed to delete post', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}