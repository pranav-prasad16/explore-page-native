import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { PropsWithChildren } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type ImageData = {
  id: number;
  src: any;
  title: string;
  description: string;
};

type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
  imageData?: ImageData;
}>;

export default function ImageInfo({ isVisible, imageData, onClose }: Props) {
  if (!isVisible || !imageData) return null;

  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={isVisible}>
        <View style={styles.overlay}>
          <View style={styles.modalContent}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>
                {imageData.title || 'Information'}
              </Text>
              <Pressable onPress={onClose}>
                <MaterialIcons name="close" color="#fff" size={22} />
              </Pressable>
            </View>
            <View style={styles.body}>
              <Text style={styles.description}>
                {imageData.description || 'No description available'}
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // ✅ Adds a semi-transparent background
  },
  modalContent: {
    height: '25%',
    width: '100%',
    backgroundColor: '#25292e',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
  },
  titleContainer: {
    height: '16%',
    backgroundColor: '#464C55',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
  body: {
    marginTop: 10,
  },
  description: {
    color: '#fff',
    fontSize: 16,
  },
});
