export type Person = {
  id: string;
  name: string;
  photoBase64: string;
  createdAt: number;
  usageCount: number;
};

export type CostumeOutput = {
  id: string;
  imageSrc: string; // Image source (base64 data URL or file path)
  costumeDescription: string;
  personId?: string;
  personName?: string;
  createdAt: number;
  credits: number;
  outputType: 'costume' | 'group_selfie';
};
