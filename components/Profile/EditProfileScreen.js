// EditProfileScreen.js
import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, StyleSheet, Button, Alert } from 'react-native';


// Initialize Firebase app
const app = initializeApp(firebaseConfig);

const EditProfileScreen = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch images from Firebase Storage when component mounts
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const storage = getStorage(app);
      const imagesRef = ref(storage, 'images/'); // Reference to the images folder in Firebase Storage

      // Fetch the list of items (images) in the images folder
      const listResult = await listAll(imagesRef);

      // Get download URL for each image and add it to the images state
      const imageUrls = await Promise.all(
        listResult.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return { id: itemRef.name, url };
        })
      );

      setImages(imageUrls);
    } catch (error) {
      console.error('Error fetching images:', error.message);
    }
  };

  const handleImageUpload = async () => {
    try {
      // Example: Image upload functionality
      const imageData = ''; // Placeholder for image data (e.g., base64 data)
      const storage = getStorage(app);
      const imageRef = ref(storage, `images/image_${Date.now()}.jpg`); // Unique image name using current timestamp
      await uploadBytes(imageRef, imageData);

      // After successful upload, refresh the list of images
      fetchImages();
    } catch (error) {
      console.error('Error uploading image:', error.message);
      Alert.alert('Error', 'Failed to upload image');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        numColumns={3}
        renderItem={({ item }) => (
          <Image source={{ uri: item.url }} style={styles.image} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.imageContainer}
      />
      <Button title="Upload Image" onPress={handleImageUpload} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
    resizeMode: 'cover',
  },
});

export default EditProfileScreen;