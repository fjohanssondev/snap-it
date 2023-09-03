import { Camera, CameraType } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Snap() {
  const camera = useRef<Camera>(null);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  return (
    <View className="flex flex-1">
      <Camera style={{ flex: 1 }} type={type}>
        <View className='flex flex-row items-center mt-auto p-8'>
          <TouchableOpacity className='mr-auto' onPress={toggleCameraType}>
            <Ionicons name="camera-reverse" size={32} color="white" />
          </TouchableOpacity>
          <View className='border-4 border-white rounded-full'>
            <TouchableOpacity className='relative bg-white p-7 m-1 rounded-full'></TouchableOpacity>
          </View>
        </View>
      </Camera>
    </View>
  );
}