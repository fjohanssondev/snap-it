import { Camera, CameraType } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';

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
            <Text>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity className='relative bg-white/60 p-8 rounded-full'>
            <View className='p-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
              <View className='bg-white/60 p-6 rounded-full'></View>
            </View>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}