export interface Post {
  id: string;
  subjectPost: string;
  userId: string;
  user: {
    name: string;
    email: string;
    userPhoto: string;
  };
  disciplinePost: string;
  textPost?: string;
  photoPost?: string;
  createdAt: number;
  postLikes: number;
  postDislikes: number;
  postComments: number;
}

export interface CreatePost {
  nameCollection: string;
  userId: string;
  disciplinePost: string;
  subjectPost: string;
  textPost?: string;
  photoPost?: string;
}
