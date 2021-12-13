// Main user info
interface composerObject {
  firstName: string;
  lastName: string;
  isPublisher: number;
}

// User profile data
interface composerProfileObject {
  bio: string;
  website?: string; // optional
}

// Content posted to the website
// Can hold list of works and performances (experience)
interface composerContentObject {
  contentName: string;
  contentText: string;
  contentType: string;
  tag?: string; // Optional
}

// interface for the combined composer object
interface composerType {
  composer: composerObject;
  userProfile: composerProfileObject;
  content: composerContentObject[];
}

// array of composerType
let composers: composerType[] = [
  {
    composer: { firstName: "composer1", lastName: "", isPublisher: 0 },
    userProfile: { bio: "", website: "" },
    content: [
      { contentName: "name1", contentText: "text1", contentType: "music" },
      {
        contentName: "name2",
        contentText: "text2",
        contentType: "experience",
        tag: "pastPerformance",
      },
    ],
  },
  {
    composer: { firstName: "composer2", lastName: "", isPublisher: 0 },
    userProfile: { bio: "", website: "" },
    content: [
      { contentName: "name1", contentText: "text1", contentType: "music" },
      {
        contentName: "name2",
        contentText: "text2",
        contentType: "experience",
        tag: "pastPerformance",
      },
    ],
  },
];
