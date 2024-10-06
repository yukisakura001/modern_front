// 動的ルーティング

import apiClient from "@/lib/apiClient";
import { Profile, PostType } from "@/types";

type Props = {
  profile: Profile;
  posts: PostType[];
};

export const getServerSideProps = async (context: any) => {
  const { userId } = context.query;
  try {
    const profileResponse = await apiClient.get(`/users/profile/${userId}`); //特定のユーザーのプロフィールを取得
    const postsResponse = await apiClient.get(`/posts/${userId}`); //特定のユーザーの投稿を取得

    return {
      props: {
        profile: profileResponse.data,
        posts: postsResponse.data,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

const UserProfile = ({ profile, posts }: Props) => {
  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="w-full max-w-xl mx-auto">
          <div className="bg-white shadow-md rounded-lg p-6 mb-4">
            <div className="flex items-center">
              <img
                className="w-20 h-20 rounded-full mr-4"
                alt="User Avatar"
                src={profile.profileImageUrl}
              />
              <div>
                <h2 className="text-2xl font-semibold mb-1">
                  {profile.user.username}
                </h2>
                <p className="text-gray-600">{profile.bio}</p>
              </div>
            </div>
          </div>
          {posts.map((post: PostType) => (
            <div className="bg-white shadow-md rounded p-4 mb-4" key={post.id}>
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <img
                    className="w-10 h-10 rounded-full mr-2"
                    alt="User Avatar"
                    src={profile.profileImageUrl}
                  />
                  <div>
                    <h2 className="font-semibold text-md">
                      {post.author.username}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      {new Date(post.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700">{post.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      ;
    </div>
  );
};

export default UserProfile;
