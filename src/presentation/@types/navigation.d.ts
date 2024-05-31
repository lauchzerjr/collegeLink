export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      favorites: undefined;
      profile: undefined;
      PostsScreen: { nameCourse: string };
      PostCommentsScreen: { postId: string };
      PostProfileScreen: { userId: string };
      login: undefined;
      CreatePostScreen: {
        postId?: string;
        postContent?: {
          disciplinePost: string;
          subjectPost: string;
          textPost: string;
          photoPost: string;
        };
      };
      PostProfileScreen: undefined;
    }
  }
}
