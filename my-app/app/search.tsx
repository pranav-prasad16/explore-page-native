import {
  Text,
  View,
  TextInput,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Animated,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import ImageInfo from '@/components/ImageInfo';
import axios from 'axios';

const API_KEY = '0d01903252e64659976d310b9879b89c';

type ImageData = {
  id: number;
  src: any;
  title: string;
  description: string;
};

type Article = {
  title: string;
  description: string;
  urlToImage?: string;
};

const images: ImageData[] = [
  {
    id: 1,
    src: require('./../assets/images/img1.jpg'),
    title: 'TEAMS',
    description: `Build, strategize, and win together! 🚀 Unite your squad and dominate every challenge! 💪🔥 #TeamworkWins`,
  },
  {
    id: 2,
    src: require('./../assets/images/img2.jpg'),
    title: 'CLUBS',
    description: `Join elite sports clubs, train like a pro, and push your limits! 🏅🔥 Find your squad and rise to the top!`,
  },
  {
    id: 3,
    src: require('./../assets/images/img3.jpg'),
    title: 'GYM',
    description: `Strength, endurance, transformation! 🏋️‍♂️ Crush your fitness goals with top-tier equipment & expert guidance! 🔥💯`,
  },
  {
    id: 4,
    src: require('./../assets/images/img4.jpg'),
    title: 'SHOP',
    description: `Gear up like a champion! 🏀👟 Explore the best sportswear & equipment to fuel your performance! 🚀🏆`,
  },
  {
    id: 5,
    src: require('./../assets/images/img5.jpg'),
    title: 'Swimming',
    description: `Make waves, break records, and master the art of swimming! 🌊🏅 Dive into top-notch training & elite coaching!`,
  },
  {
    id: 6,
    src: require('./../assets/images/img6.jpg'),
    title: 'Basketball',
    description: `Dribble, dunk, dominate! 🏆🔥 Train with the best and elevate your game to pro levels! ⛹️‍♂️🏀`,
  },
];

const sports = [
  { id: 'trending', name: 'Trending', icon: 'fire' },
  { id: 'cricket', name: 'Cricket', icon: 'cricket' },
  { id: 'soccer', name: 'Football', icon: 'soccer' },
  { id: 'basketball', name: 'Basketball', icon: 'basketball' },
  { id: 'volleyball', name: 'Volleyball', icon: 'volleyball' },
  { id: 'baseball', name: 'Baseball', icon: 'baseball' },
  { id: 'rugby', name: 'Rugby', icon: 'rugby' },
];

export default function SearchScreen() {
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [expandAnim] = useState(new Animated.Value(50));
  const [newsData, setNewsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);

  const handleSelect = async (sportId: string) => {
    setSelectedSport(sportId);
    fetchNews(sportId);

    Animated.timing(expandAnim, {
      toValue: 120,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleImageSelect = (image: ImageData) => {
    setSelectedImage(image);
    setIsModalVisible(true);
  };

  const printDate = (dateString: string) => {
    const date = new Date(dateString);

    const day = date.toLocaleDateString('en-GB', { weekday: 'short' });

    const formattedDate = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });
    const formattedTime = date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    return ` ${day} ${formattedDate} · ${formattedTime}`;
  };

  const fetchNews = async (sportId: string) => {
    setLoading(true);

    if (sportId === 'trending') {
      setNewsData([
        {
          title: 'India Won! 🎉',
          description:
            'India Won! 🎉 A historic triumph that ignites the spirit of a billion hearts! 🇮🇳 From the streets to the stadiums, the nation erupts in joy, celebrating resilience, passion, and glory. 🏆💙 This victory isn’t just a win—it’s a moment of pride, unity, and unstoppable spirit! 🚀🔥 #ChampionMindset #GloryForIndia',
          urlToImage:
            'https://www.newsx.com/wp-content/uploads/2025/03/ICC-Champions-Trophy-2.webp',
          publishedAt: '2025-03-09T17:30:00Z',
        },
        {
          title: 'We are the champions 🤩',
          description:
            'We are the champions! 🤩🏆 A victory written in hard work, dedication, and unwavering spirit! 💪🔥 The journey was tough, but we conquered every challenge and emerged victorious. 🚀🎉 This is our moment to shine! ✨ #Unstoppable #VictoryDance',
          urlToImage:
            'https://www.hindustantimes.com/ht-img/img/2025/03/09/550x309/icc_champions_trophy_win_mp_mhow_clashes_1741550806772_1741550808338.jpg',
          publishedAt: '2025-03-09T17:30:00Z',
        },
      ]);
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${sportId}&language=en&apiKey=0d01903252e64659976d310b9879b89c`
      );
      if (response.data.articles && response.data.articles.length > 0) {
        setNewsData(
          response.data.articles.slice(0, 3).map((article: Article) => ({
            ...article,
            sport: sportId,
          }))
        );
      } else setNewsData([]);
    } catch (error) {
      console.error('Error fetching news:', error);
      setNewsData([]);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.innerContainer, styles.columnContainer]}>
          <View style={[styles.rowContainer, styles.searchBoxView]}>
            <Ionicons name="search" size={20} color="#888888" />
            <TextInput
              placeholder="Search"
              placeholderTextColor="#999"
              style={styles.searchBox}
            />
          </View>
          <View style={styles.rowContainer}>
            {images.slice(0, 4).map((image) => (
              <TouchableOpacity
                key={image.id}
                onPress={() => handleImageSelect(image)}
                style={styles.imageWrapper}
              >
                <View style={styles.imageContainer}>
                  <Image source={image.src} style={styles.image} />
                </View>
                <Text style={styles.text}>{image.title}</Text>
              </TouchableOpacity>
            ))}
            <ImageInfo
              isVisible={isModalVisible}
              imageData={selectedImage || undefined}
              onClose={() => setIsModalVisible(false)}
            />
          </View>
        </View>
        <View style={[styles.bgGrey, { paddingVertical: 20 }]}>
          <View style={[styles.rowContainer, styles.sectionHeader]}>
            <Text style={styles.subHeading1}>Top Events</Text>
            <View style={styles.viewAllContainer}>
              <Text style={styles.viewAllText}>View all</Text>
              <Ionicons name="chevron-forward" size={16} color="#888" />
              <Ionicons
                name="chevron-forward"
                size={16}
                color="#888"
                style={{ marginLeft: -10 }}
              />
            </View>
          </View>
          <View>
            <View style={styles.heroContainer}>
              <FlatList
                data={sports}
                horizontal
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                  const isSelected = selectedSport === item.id;

                  return (
                    <TouchableOpacity onPress={() => handleSelect(item.id)}>
                      <View
                        style={[
                          styles.itemContainer,
                          isSelected ? styles.expanded : {},
                        ]}
                      >
                        <View style={styles.iconCircle}>
                          <MaterialCommunityIcons
                            name={item.icon as any}
                            size={24}
                            color={isSelected ? 'green' : 'white'}
                          />
                        </View>
                        {isSelected && (
                          <Text style={styles.sportText}>{item.name}</Text>
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
            <View
              style={{ paddingBottom: 20, width: '90%', alignSelf: 'center' }}
            >
              {loading ? (
                <ActivityIndicator
                  size="large"
                  color="white"
                  style={styles.loader}
                />
              ) : newsData.length > 0 ? (
                <FlatList
                  data={newsData}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        width: Dimensions.get('window').width * 0.9,
                        marginHorizontal: 5,
                      }}
                    >
                      <ImageBackground
                        source={{
                          uri:
                            item.urlToImage ||
                            'https://via.placeholder.com/600x300',
                        }}
                        style={[styles.newsContainer, { width: '100%' }]}
                      >
                        <View style={styles.newsContent}>
                          <Text
                            style={styles.newsTitle}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                          >
                            {item.title.toUpperCase()}
                          </Text>
                          <View style={styles.rowContainer}>
                            <Text>
                              <Text style={styles.sportLabel}>
                                {selectedSport} ·
                              </Text>
                              <Text style={styles.publishedDate}>
                                {printDate(item.publishedAt)}
                              </Text>
                            </Text>
                          </View>
                        </View>
                      </ImageBackground>
                    </View>
                  )}
                  horizontal={true}
                  pagingEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
              ) : (
                <Text style={styles.noNewsText}>
                  No news available for this sport.
                </Text>
              )}
            </View>
          </View>
        </View>
        <View style={styles.bgGrey}>
          <Text
            style={[
              styles.sectionHeader,
              styles.subHeading1,
              styles.subHeading2,
            ]}
          >
            Top Sports Clubs
          </Text>
          <View style={styles.rowContainer}>
            {images.slice(4, 6).map((image) => (
              <TouchableOpacity
                key={image.id}
                onPress={() => handleImageSelect(image)}
                style={styles.imageClubWrapper}
              >
                <View style={styles.imageClubContainer}>
                  <Image source={image.src} style={styles.image} />
                </View>
                <Text style={styles.text}>{image.title}</Text>
              </TouchableOpacity>
            ))}
            <ImageInfo
              isVisible={isModalVisible}
              imageData={selectedImage || undefined}
              onClose={() => setIsModalVisible(false)}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: 10,
    fontFamily: 'Poppins-Regular',
  },
  subHeading1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subHeading2: {
    fontSize: 14,
  },
  bgGrey: {
    backgroundColor: '#141414',
  },
  text: { color: '#FFFFFF', fontSize: 10 },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  columnContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  innerContainer: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 50,
  },
  searchBoxView: {
    backgroundColor: '#000000',
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#3D3D3D',
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBox: {
    color: '#FFFFFF',
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
  },
  imageWrapper: {
    width: '25%',
    alignItems: 'center',
    marginVertical: 5,
  },
  imageContainer: {
    width: 70,
    height: 70,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
  heroSection: {
    backgroundColor: '#303030',
  },
  sectionHeader: {
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  viewAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: '#888888',
    marginRight: 5,
  },
  heroContainer: {
    marginVertical: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    marginVertical: 5,
    paddingVertical: 10,
    marginHorizontal: 5,
    backgroundColor: '#141414',
  },
  expanded: {
    backgroundColor: '#303030',
    paddingHorizontal: 20,
    marginTop: 10,
    paddingVertical: 4,
    paddingLeft: 5,
    paddingRight: 16,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#141414',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#313131',
    borderWidth: 1,
  },
  sportText: {
    color: '#FFFFFF',
    marginLeft: 10,
    fontSize: 14,
  },
  loader: {
    marginTop: 20,
  },
  newsContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 25,
    overflow: 'hidden',
  },
  newsContent: {
    padding: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  newsTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noNewsText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  sportLabel: {
    color: '#12956B',
    fontSize: 12,
    marginBottom: 5,
  },
  publishedDate: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 5,
  },
  imageClubWrapper: {
    width: '50%',
    alignItems: 'center',
    marginVertical: 5,
  },
  imageClubContainer: {
    width: 150,
    height: 100,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
  },
});
