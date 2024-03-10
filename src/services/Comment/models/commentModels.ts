export type Comment = {
  id: string;
  postId: string;
  userId: string;
  user: {
    name: string;
    userPhoto: string;
  };
  text: string;
};
