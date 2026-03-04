/**
 * Converts an image URL to a base64 data URL
 * @param url - The URL of the image to convert
 * @returns Promise that resolves to a base64 data URL string
 */
export async function imageUrlToBase64(url: string): Promise<string> {
  try {
    // Fetch the image from the URL
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    // Convert response to blob
    const blob = await response.blob();

    // Convert blob to base64 using FileReader
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to convert image to base64'));
        }
      };

      reader.onerror = () => {
        reject(new Error('FileReader error'));
      };

      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error converting image URL to base64:', error);
    // Return the original URL as fallback
    return url;
  }
}
