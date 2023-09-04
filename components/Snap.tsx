import { Camera, CameraType } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, Text, Pressable, View, Image } from 'react-native';
import { Video } from 'expo-av'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Snap() {
  const camera = useRef<Camera>(null);
  const video = useRef(null);
  const [type, setType] = useState(CameraType.back);
  const [record, setRecord] = useState<string>('');
  const [status, setStatus] = useState({});
  const [photo, setPhoto] = useState('');
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <SafeAreaView>
        <View className='flex h-full justify-center items-center'>
          <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
      </SafeAreaView>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  const recordVideo = async () => {
    if (camera.current) {
      try {
        const video = await camera.current.recordAsync({
          quality: 1080,
          maxDuration: 15,
          maxFileSize: 200,
          mute: false,
          videoBitrate: 5000000
        });
        console.log('video', video);
        setRecord(video.uri)
      } catch (error) {
        console.error(error);
      }
    }
  }

  const stopRecording = () => {
    camera.current?.stopRecording();
  }

  const takePhoto = async () => {
    if (camera.current) {
      try {
        const photo = await camera.current.takePictureAsync();
        console.log('photo', photo);
        setPhoto(photo.uri)
      } catch (error) {
        console.error(error);
      }
    }
  }

  console.log(photo)

  return (
    <View className="flex flex-1">
      {photo === '' ? (
        <>
          <Camera ref={camera} style={{ flex: 1 }} type={type}>
          <View className='flex flex-row items-center mt-auto p-8'>
            <Pressable className='mr-auto' onPress={toggleCameraType}>
              <Ionicons name="camera-reverse" size={32} color="white" />
            </Pressable>
            <View className='border-4 border-white rounded-full'>
              <Pressable onPress={takePhoto} onLongPress={recordVideo} onPressOut={stopRecording} className='relative bg-white p-7 m-1 rounded-full'></Pressable>
            </View>
          </View>
          </Camera>
          <Video
            ref={video}
            source={{
              uri: record,
            }}
            useNativeControls
            isLooping
            onPlaybackStatusUpdate={status => setStatus(() => status)}
          />
        </>
      ) : (
        <View className='flex flex-1 relative'>
          <Pressable onPress={() => setPhoto('')} className='absolute z-10 top-10 right-5 p-4'>
            <Ionicons name="close" size={32} color="white" />
          </Pressable>
          <Link asChild href="/post/create">
            <Pressable className='bg-white rounded-full px-8 py-4 absolute z-10 bottom-10 right-5'>
              <Text className='text-black font-semibold'>Send</Text>
            </Pressable>
          </Link>
          <Image source={{ uri: photo }} className='flex-1' />
        </View>
      )}
    </View>
  );
}