export type Person = {
  id: string;
  name: string;
  photoBase64: string;
  createdAt: number;
  usageCount: number;
};

export type CostumeOutput = {
  id: string;
  imageUrl: string;
  costumeDescription: string;
  personId?: string;
  personName?: string;
  createdAt: number;
  credits: number;
  outputType: 'costume' | 'group_selfie';
};
