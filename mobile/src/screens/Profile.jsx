import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {
    const { t, i18n } = useTranslation();
    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        birthPlace: '',
        birthTime: '',
        phoneNumber: '',
        location: '',
    });

    const [showPicker, setShowPicker] = useState(false);
    const [pickerMode, setPickerMode] = useState('date');
    const [activeField, setActiveField] = useState(null);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    const handleDateChange = (event, selectedDate) => {
        if (Platform.OS === 'android') {
            setShowPicker(false);
        }

        if (selectedDate) {
            if (activeField === 'dob') {
                handleInputChange('dob', formatDate(selectedDate));
            } else if (activeField === 'birthTime') {
                handleInputChange('birthTime', formatTime(selectedDate));
            }
        }
    };

    const openDatePicker = () => {
        setPickerMode('date');
        setActiveField('dob');
        setShowPicker(true);
    };

    const openTimePicker = () => {
        setPickerMode('time');
        setActiveField('birthTime');
        setShowPicker(true);
    };

    const toggleSection = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const handleItemPress = (item, index) => {
        if (item.route === 'RateUs' || item.route === 'Share') {
            console.log('Action item clicked:', item.route);
            return;
        }
        toggleSection(index);
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const menuItems = [
        {
            icon: 'person-outline',
            label: 'screens.myProfile',
            route: 'MyProfile',
        },
        {
            icon: 'language-outline',
            label: 'screens.language',
            route: 'Language',
        },
        {
            icon: 'star-outline',
            label: 'screens.rateUs',
            route: 'RateUs',
        },
        {
            icon: 'share-social-outline',
            label: 'screens.share',
            route: 'Share',
        },
        {
            icon: 'information-circle-outline',
            label: 'screens.about',
            route: 'About',
        },
        {
            icon: 'shield-checkmark-outline',
            label: 'screens.privacyPolicy',
            route: 'PrivacyPolicy',
        },
        {
            icon: 'alert-circle-outline',
            label: 'screens.disclaimer',
            route: 'Disclaimer',
        },
    ];

    const renderMenuItem = (item, index) => {
        const isExpanded = expandedIndex === index;
        return (
            <View key={index} style={styles.menuItemContainer}>
                <TouchableOpacity
                    style={styles.menuItemHeader}
                    activeOpacity={0.8}
                    onPress={() => handleItemPress(item, index)}
                >
                    <View style={styles.menuItemLeft}>
                        <View style={styles.iconContainer}>
                            <Ionicons name={item.icon} size={22} color="#ff9933" />
                        </View>
                        <Text style={styles.menuItemText}>{t(item.label)}</Text>
                    </View>
                    <Ionicons
                        name={(isExpanded && item.route !== 'RateUs' && item.route !== 'Share') ? "chevron-down" : "chevron-forward"}
                        size={20}
                        color="#ccc"
                    />
                </TouchableOpacity>
                {(isExpanded || item.route === 'Language') && expandedIndex === index && (
                    <View style={styles.menuItemContent}>
                        {item.route === 'MyProfile' && (
                            <View style={styles.formContainer}>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>{t('profileForm.name')}</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={t('profileForm.name')}
                                        value={formData.name}
                                        onChangeText={(text) => handleInputChange('name', text)}
                                    />
                                </View>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>{t('profileForm.dob')}</Text>
                                    <TouchableOpacity onPress={openDatePicker}>
                                        <View pointerEvents="none">
                                            <TextInput
                                                style={styles.input}
                                                placeholder="DD/MM/YYYY"
                                                value={formData.dob}
                                                editable={false}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>{t('profileForm.birthPlace')}</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={t('profileForm.birthPlace')}
                                        value={formData.birthPlace}
                                        onChangeText={(text) => handleInputChange('birthPlace', text)}
                                    />
                                </View>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>{t('profileForm.birthTime')}</Text>
                                    <TouchableOpacity onPress={openTimePicker}>
                                        <View pointerEvents="none">
                                            <TextInput
                                                style={styles.input}
                                                placeholder="HH:MM"
                                                value={formData.birthTime}
                                                editable={false}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>{t('profileForm.phoneNumber')}</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={t('profileForm.phoneNumber')}
                                        value={formData.phoneNumber}
                                        onChangeText={(text) => handleInputChange('phoneNumber', text)}
                                        keyboardType="phone-pad"
                                    />
                                </View>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>{t('profileForm.location')}</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={t('profileForm.location')}
                                        value={formData.location}
                                        onChangeText={(text) => handleInputChange('location', text)}
                                    />
                                </View>

                                <TouchableOpacity style={styles.saveButton} activeOpacity={0.8}>
                                    <Text style={styles.saveButtonText}>{t('profileForm.save')}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        {item.route === 'Language' && (
                            <View style={styles.languageContainer}>
                                {['en', 'hi'].map((lang) => (
                                    <TouchableOpacity
                                        key={lang}
                                        style={[
                                            styles.languageOption,
                                            i18n.language === lang && styles.languageOptionSelected
                                        ]}
                                        onPress={() => i18n.changeLanguage(lang)}
                                        activeOpacity={0.7}
                                    >
                                        <Text style={[
                                            styles.languageText,
                                            i18n.language === lang && styles.languageTextSelected
                                        ]}>
                                            {lang === 'en' ? 'English' : 'हिंदी'}
                                        </Text>
                                        {i18n.language === lang && (
                                            <Ionicons name="checkmark-circle" size={24} color="#ff9933" />
                                        )}
                                        {i18n.language !== lang && (
                                            <View style={styles.radioUnselected} />
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                )}
            </View>
        );
    };

    const getPickerValue = () => {
        if (activeField === 'dob' && formData.dob) {
            const [day, month, year] = formData.dob.split('/');
            return new Date(year, month - 1, day);
        }
        if (activeField === 'birthTime' && formData.birthTime) {
            const [hours, minutes] = formData.birthTime.split(':');
            const date = new Date();
            date.setHours(hours);
            date.setMinutes(minutes);
            return date;
        }
        return new Date();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton} activeOpacity={0.7}>
                        <Ionicons name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{t('screens.profile')}</Text>
                    <View style={styles.headerRight} />
                </View>

                <View style={styles.profileSection}>
                    <TouchableOpacity
                        onPress={pickImage}
                        style={styles.imageContainer}
                        activeOpacity={0.8}
                    >
                        {image ? (
                            <Image source={{ uri: image }} style={styles.profileImage} />
                        ) : (
                            <View style={styles.placeholderImage}>
                                <Ionicons name="person" size={50} color="#ccc" />
                            </View>
                        )}
                        <View style={styles.editIconContainer}>
                            <Ionicons name="add" size={20} color="#fff" />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.uploadText}>{t('screens.uploadPhoto')}</Text>
                </View>

                <View style={styles.menuContainer}>
                    {menuItems.map(renderMenuItem)}
                </View>
            </ScrollView>

            {(showPicker && Platform.OS === 'ios') && (
                <View style={styles.iosPickerContainer}>
                    <View style={styles.iosPickerHeader}>
                        <TouchableOpacity onPress={() => setShowPicker(false)}>
                            <Text style={styles.iosPickerDone}>Done</Text>
                        </TouchableOpacity>
                    </View>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={getPickerValue()}
                        mode={pickerMode}
                        is24Hour={true}
                        display="spinner"
                        onChange={handleDateChange}
                        style={{ backgroundColor: 'white' }}
                    />
                </View>
            )}

            {(showPicker && Platform.OS === 'android') && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={getPickerValue()}
                    mode={pickerMode}
                    is24Hour={true}
                    display="default"
                    onChange={handleDateChange}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    scrollContent: {
        paddingBottom: 40,
    },
    iosPickerContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderColor: '#e1e1e1',
        zIndex: 1000,
    },
    iosPickerHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 10,
        backgroundColor: '#f8f9fa',
        borderBottomWidth: 1,
        borderColor: '#e1e1e1',
    },
    iosPickerDone: {
        color: '#007AFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    header: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    backButton: {
        padding: 4,
    },
    headerRight: {
        width: 32,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    profileSection: {
        alignItems: 'center',
        marginVertical: 20,
    },
    imageContainer: {
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: '#fff',
    },
    placeholderImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#e1e1e1',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#fff',
    },
    editIconContainer: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: '#ff9933',
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fff',
    },
    uploadText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
        fontWeight: '600',
    },
    menuContainer: {
        marginTop: 10,
        paddingHorizontal: 20,
    },
    menuItemContainer: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
        overflow: 'hidden',
    },
    menuItemHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 20,
    },
    menuItemContent: {
        backgroundColor: '#fafafa',
        paddingHorizontal: 20,
        paddingBottom: 20,
        paddingTop: 5,
    },
    profileInfo: {
        marginTop: 5,
    },
    formContainer: {
        marginTop: 5,
    },
    inputGroup: {
        marginBottom: 15,
    },
    inputLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 6,
        fontWeight: '500',
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e1e1e1',
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        color: '#333',
    },
    saveButton: {
        backgroundColor: '#ff9933',
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 10,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff5e6', // light orange bg
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    menuItemText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    languageContainer: {
        marginTop: 5,
    },
    languageOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 12,
        marginBottom: 8,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e1e1e1',
    },
    languageOptionSelected: {
        borderColor: '#ff9933',
        backgroundColor: '#fff5e6',
    },
    languageText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    languageTextSelected: {
        color: '#ff9933',
        fontWeight: '600',
    },
    radioUnselected: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#ddd',
    },
});
