export function getUser() {
  return {
    uid: "unique_user_id",
    email: "user@example.com",
    emailVerified: true,
    displayName: "User Name",
    photoURL: "https://example.com/photo.jpg",
    phoneNumber: "+1234567890",
    providerId: "firebase",
    providerData: [
      {
        providerId: "google.com",
        uid: "google_user_id",
        displayName: "User Name",
        photoURL: "https://example.com/photo.jpg",
        email: "user@example.com",
        phoneNumber: null,
      },
    ],
    metadata: {
      creationTime: "2024-01-01T00:00:00.000Z",
      lastSignInTime: "2024-01-01T12:00:00.000Z",
    },
    customClaims: null,
    tenantId: null,
    tokenManager: {
      accessToken: "OAuth2_access_token",
      expirationTime: 1234567890123,
      refreshToken: "refresh_token",
    },
  };
}

export function getDevices() {
  return [
    {
      deviceId: "jfhdkd24mcd",
      displayName: "Курсоуказатель 1",
      lastActiveTime: "2024-01-01T12:00:00.000Z",
      isVisible: true,
    },
    {
      deviceId: "fslavmjfkav",
      displayName: "Курсоуказатель 2",
      lastActiveTime: "2024-01-01T12:00:00.000Z",
      isVisible: true,
    },
    {
      deviceId: "vfklvslvvv",
      displayName: "Курсоуказатель 3",
      lastActiveTime: "2024-01-01T12:00:00.000Z",
      isVisible: false,
    },
    {
      deviceId: "cdscklmkc95",
      displayName: "Подрулька",
      lastActiveTime: "2024-01-01T12:00:00.000Z",
      isVisible: true,
    },
  ];
}
